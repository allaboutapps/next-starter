// ts-check

// https://github.dev/vercel/next.js/tree/canary/examples/cache-handler-redis
// https://caching-tools.github.io/next-shared-cache/installation
// https://caching-tools.github.io/next-shared-cache/redis
// https://caching-tools.github.io/next-shared-cache/handlers/redis-strings
import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";
import memoize from "lodash/memoize.js";
import toLower from "lodash/toLower.js";
import { performance } from "perf_hooks";

function getCacheHandlerTTL() {
    // https://caching-tools.github.io/next-shared-cache/api-reference/ttl-parameters
    return {
        // The time in seconds for when the cache entry becomes stale. Defaults to 1 year.
        defaultStaleAge: process.env.CACHE_DEFAULT_STALE_AGE
            ? parseInt(process.env.CACHE_DEFAULT_STALE_AGE, 10)
            : (60 * 60 * 24 * 365),
        estimateExpireAge: (staleAge) => staleAge * 2
    }
}

const getCacheHandlers = memoize(async (buildId) => {
    console.log(`getCacheHandlers: build-id="${buildId}"`);

    // bailout fallback
    if (!process.env.REDIS_URL) {
        // Fallback to LRU handler if REDIS_URL is not available.
        // The application will still work, but the cache will be in memory only and not shared.
        console.warn("getCacheHandlers: Using LRU handler because REDIS_URL is not configured.");
        return {
            handlers: [createLruHandler()],
            ttl: getCacheHandlerTTL()
        };
    }

    const redisUrl = process.env.REDIS_URL;
    const connectTimeout = process.env.REDIS_CONNECT_TIMEOUT_MS ? parseInt(process.env.REDIS_CONNECT_TIMEOUT_MS, 10) : 3000;
    const maxRetries = process.env.REDIS_CONNECT_MAX_RETRIES ? parseInt(process.env.REDIS_CONNECT_MAX_RETRIES, 10) : 3;

    let client;

    try {
        // Create a Redis client.
        client = createClient({
            url: redisUrl,
            socket: {
                connectTimeout,
                reconnectStrategy: (retries) => {
                    console.warn(`getCacheHandlers: Redis client reconnecting, attempt ${retries} of ${maxRetries}.`);

                    if (retries > maxRetries) {
                        return false;
                    }
                    return Math.min(retries * 1500, connectTimeout);
                },
            }
        });

        // Redis won't work without error handling.
        client.on("error", (e) => {
            console.error("getCacheHandlers: Redis client error:", e);
        });
    } catch (error) {
        console.warn(`getCacheHandlers: Failed to create Redis client redisUrl="${redisUrl}. error:"`, error);
    }

    if (client) {
        try {
            console.info(`getCacheHandlers: Connecting redisUrl="${redisUrl}" connectTimeout="${connectTimeout}" maxRetries="${maxRetries}"...`);

            // Wait for the client to connect.
            // Caveat: This will block the server from starting until the client is connected.
            // And there is no timeout. Make your own timeout if needed.
            await client.connect();
            console.info(`getCacheHandlers: redisUrl="${redisUrl}" connected.`);
        } catch (error) {
            console.warn("getCacheHandlers: Failed to connect Redis client:", error);

            console.warn("getCacheHandlers: Disconnecting the Redis client...");
            // Try to disconnect the client to stop it from reconnecting.
            client.disconnect().then(() => {
                console.info(`getCacheHandlers: Client redisUrl="${redisUrl}" disconnected.`);
            }).catch(() => {
                console.warn("getCacheHandlers: Failed to quit the Redis client after failing to connect.");
            });
        }
    }

    if (!client?.isReady) {
        console.error(`getCacheHandlers: Failed to connect to redisUrl="${redisUrl}" - exit 1!`);

        // EXIT!
        process.exit(1);
    }

    const keyPrefix = process.env.REDIS_KEY_PREFIX ?? `nextapp-${buildId}:`;
    const timeoutMs = process.env.REDIS_OPS_TIMEOUT_MS ? parseInt(process.env.REDIS_OPS_TIMEOUT_MS, 10) : 3000;
    const keyExpirationStrategy = process.env.REDIS_KEY_EXPIRATION_STRATEGY ?? "EXPIREAT"; // "EXAT" # Requires Redis server 6.2.0 or newer

    console.log(`getCacheHandlers: Using redisUrl="${redisUrl}" with keyPrefix="${keyPrefix}" timeoutMs="${timeoutMs}" keyExpirationStrategy="${keyExpirationStrategy}".`);

    // Create the `redis-stack` Handler if the client is available and connected.
    /** @type {import("@neshca/cache-handler").Handler | null} */
    const handler = await createRedisHandler({
        client,
        keyPrefix,
        timeoutMs,
        keyExpirationStrategy
    });

    return {
        handlers: [handler],
        ttl: getCacheHandlerTTL()
    };
});

const accessStart = process.env.ENABLE_CACHE_ACCESS_LOG !== "true"
    ? () => 0
    : () => performance.now();

const accessLog = process.env.ENABLE_CACHE_ACCESS_LOG !== "true"
    ? () => undefined
    : (performanceStart, ...rest) => {
        const duration = performance.now() - performanceStart;
        console.log(...rest, `in ${duration.toFixed(3)}ms.`);
    };

// TODO allow to modify default expiry time for cache entries
// TODO potentially intercept if cache is not available sometimes and fallback to local LRU in these cases
//   This way we could still serve the app/page, but the cache result would not be shared across all next replicas.
// https://nextjs.org/docs/app/building-your-application/deploying#configuring-caching
class AppCacheHandler extends CacheHandler {

    constructor(context) {
        super(context);
    }

    async get(cacheKey, ctx) {
        const start = accessStart();
        try {
            const ret = await super.get(cacheKey, ctx);

            accessLog(start, `[CACHE] get: ${toLower(ctx?.kindHint ?? "nokind?")} cacheKey=${cacheKey} lastModified=${ret?.lastModified ?? ""} expireAt=${ret?.lifespan?.expireAt ?? ""} tags=[${ctx?.tags ?? ""}] softTags=[${ctx?.softTags ?? ""}] ${ret ? "hit" : "miss"}`);

            // console.log("AppCacheHandler.get:", {
            //     cacheKey,
            //     ctx,
            //     ret
            // });

            return ret
        } catch (error) {
            accessLog(start, "[CACHE] get error:", error);
            throw error;
        }
    }

    async set(cacheKey, incrementalCacheValue, ctx) {
        const start = accessStart();
        try {
            const ret = await super.set(cacheKey, incrementalCacheValue, ctx);

            accessLog(start, `[CACHE] set: ${toLower(incrementalCacheValue?.kind ?? "nokind?")} cacheKey=${cacheKey} revalidate=${incrementalCacheValue?.revalidate ?? ""} tags=[${ctx?.tags ?? ""}]`);

            // console.log("AppCacheHandler.set:", {
            //     cacheKey,
            //     incrementalCacheValue,
            //     ctx,
            //     ret
            // });

            return ret
        } catch (error) {
            accessLog(start, "[CACHE] set error:", error);
            throw error;
        }
    }
    async revalidateTag(tag) {
        const start = accessStart();
        try {
            const ret = await super.revalidateTag(tag);
            accessLog(start, "[CACHE] revalidateTag:", tag);
            return ret
        } catch (error) {
            accessLog(start, "[CACHE] revalidateTag error:", error);
            throw error;
        }

    }
    // resetRequestCache() {
    //     try {
    //         const ret = super.resetRequestCache();
    //         console.log("AppCacheHandler.resetRequestCache:");
    //         return ret
    //     } catch (error) {
    //         console.error("AppCacheHandler.resetRequestCache error:", error);
    //         throw error;
    //     }
    // }

}

// static
AppCacheHandler.onCreation(async ({ buildId }) => {
    return getCacheHandlers(buildId);
});

export default AppCacheHandler;