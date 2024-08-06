// import { IS_DEV } from "@/config";
import { HostSettings } from "../hostSettings";

import { Client, SSRExchange, cacheExchange, createClient, fetchExchange, ssrExchange } from "@urql/next";

// This is used by the browser and during SSR
export const buildBrowserUrqlClient = (hostSettings?: HostSettings): [Client, SSRExchange] => {
    const ssr = ssrExchange({
        isClient: typeof window !== "undefined",
    });
    const token = hostSettings?.graphQlToken;
    const headers = {
        authorization: `Bearer ${token}`,
    };

    const url = hostSettings?.graphQlEndpoint;

    const client = createClient({
        url: url ?? "",
        exchanges: [
            cacheExchange,
            // SSR has to be after cacheExchange but before fetchExchange
            // https://commerce.nearform.com/open-source/urql/docs/api/core/#ssrexchange
            ssr,
            fetchExchange,
        ],
        // suspense: !IS_DEV, -> suspense was leading to infinite API requests -> disable for now

        // cache-and-network leads to duplicate API calls
        // requestPolicy: "cache-and-network",

        fetchOptions: () => {
            return {
                headers,
            };
        },
    });

    return [client, ssr];
};
