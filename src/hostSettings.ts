import { generalStore } from "./stores/generalStore";

export type HostSettings = {
    apiBaseUrl: string;
};

const allHostSettings: Record<string, HostSettings> = {
    localhost: {
        apiBaseUrl: "LOCALHOST API BASE URL (usually any of the ones below)",
    },
    dev: {
        apiBaseUrl: "DEV API BASE URL",
    },
    staging: {
        apiBaseUrl: "STAGING API BASE URL",
    },
    prod: {
        apiBaseUrl: "PROD API BASE URL",
    },
};

// Use this to get the current host settings (works for both server and client components)
export const getHostSettings = () => {
    // Server side has runtime environment in process.env
    if (process.env.RUNTIME_ENVIRONMENT) {
        return allHostSettings[process.env.RUNTIME_ENVIRONMENT];
    }

    // Client side has runtime environment in general store
    const runtimeEnvironment = generalStore.getState().runtimeEnvironment;
    if (runtimeEnvironment) {
        return allHostSettings[runtimeEnvironment];
    }
};
