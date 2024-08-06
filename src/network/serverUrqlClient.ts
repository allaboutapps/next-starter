import { ClientOptions, createClient, fetchExchange } from "@urql/next";
import { getHostSettings } from "../hostSettings";
import { CraftPreview } from "../util/craft";

// This is the client used by RSC (react server components)
export const buildServerUrqlClient = ({ craftPreview }: { craftPreview?: CraftPreview } = {}) => {
    const hostSettings = getHostSettings();

    let h = {
        authorization: `Bearer ${hostSettings?.graphQlToken}`,
    };

    if (craftPreview) {
        h = {
            ...h,
            ...craftPreview,
        };
    }

    const params: ClientOptions = {
        url: hostSettings?.graphQlEndpoint ?? "",
        exchanges: [fetchExchange],
        requestPolicy: "network-only",
        fetchOptions: () => {
            return {
                headers: h,
                // Force cache for dynamic rendered pages
                cache: "force-cache",
            };
        },
    };

    // Current setup for RSC
    // - no caching
    // - always fetch latest data
    return createClient(params);
};
