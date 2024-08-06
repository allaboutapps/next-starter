import { publicEnvVars } from "./components/providers/EnvVarsProvider";

export type HostSettings = {
    apiBaseUrl: string;
    graphQlEndpoint: string;
    graphQlToken: string;
    craftBaseUrl: string;
    nextBaseUrl: string;
};

const allHostSettings: Record<string, HostSettings> = {
    localhost: {
        apiBaseUrl: "https://LOCALHOST_API_BASE_URL", // usually any of the ones below
        craftBaseUrl: "https://LOCALHOST_CRAFT_BASE_URL",
        graphQlEndpoint: "https://LOCALHOST_CRAFT_BASE_URL/graphql/api",
        graphQlToken: "LOCAL_CRAFT_GQL_TOKEN",
        nextBaseUrl: "https://LOCALHOST_NEXT_BASE_URL",
    },
    dev: {
        apiBaseUrl: "https://DEV_API_BASE_URL",
        craftBaseUrl: "https://DEV_CRAFT_BASE_URL",
        graphQlEndpoint: "https://DEV_CRAFT_BASE_URL/graphql/api",
        graphQlToken: "DEV_CRAFT_GQL_TOKEN",
        nextBaseUrl: "https://DEV_NEXT_BASE_URL",
    },
    staging: {
        apiBaseUrl: "https://STAGING_API_BASE_URL",
        craftBaseUrl: "https://STAGING_CRAFT_BASE_URL",
        graphQlEndpoint: "https://STAGING_CRAFT_BASE_URL/graphql/api",
        graphQlToken: "STAGING_CRAFT_GQL_TOKEN",
        nextBaseUrl: "https://STAGING_NEXT_BASE_URL",
    },
    prod: {
        apiBaseUrl: "https://PROD_API_BASE_URL",
        craftBaseUrl: "https://PROD_CRAFT_BASE_URL",
        graphQlEndpoint: "https://PROD_CRAFT_BASE_URL/graphql/api",
        graphQlToken: "PROD_CRAFT_GQL_TOKEN",
        nextBaseUrl: "https://PROD_NEXT_BASE_URL",
    },
};

// Use this to get the current host settings (works for both server and client components)
export const getHostSettings = () => {
    // Server side has runtime environment in process.env
    if (process.env.RUNTIME_ENVIRONMENT) {
        return allHostSettings[process.env.RUNTIME_ENVIRONMENT];
    }

    // Client side has runtime environment in publicEnvVars
    const runtimeEnvironment = publicEnvVars.RUNTIME_ENVIRONMENT;
    if (runtimeEnvironment) {
        return allHostSettings[runtimeEnvironment];
    }
};
