import { generalStore } from "./stores/generalStore";

export type HostSettings = {
    apiBaseUrl: string;
};

const allHostSettings: Record<string, HostSettings> = {
    localhost: {
        apiBaseUrl: "https://LOCALHOST_API_BASE_URL", // usually any of the ones below
    },
    dev: {
        apiBaseUrl: "https://DEV_API_BASE_URL",
    },
    staging: {
        apiBaseUrl: "https://STAGING_API_BASE_URL",
    },
    prod: {
        apiBaseUrl: "https://PROD_API_BASE_URL",
    },
};

// Use this to get the current host settings (works for both server and client components)
export const getHostSettings = () => {
    // Server side has runtime environment in process.env
    if (process.env.RUNTIME_ENVIRONMENT) {
        return allHostSettings[process.env.RUNTIME_ENVIRONMENT];
    }

    // Client side has runtime environment in general store
    const runtimeEnvironment = generalStore.getState().envVars.RUNTIME_ENVIRONMENT;
    if (runtimeEnvironment) {
        return allHostSettings[runtimeEnvironment];
    }
};
