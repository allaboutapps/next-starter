import { PHASE_PRODUCTION_BUILD } from "next/constants";

export const MOBILE_BREAKPOINT = 768;

export const DEBUG = true;

export const IS_SERVER = typeof window === "undefined";

export const IS_BUILD = process?.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;

export type EnvVars = {
    RUNTIME_ENVIRONMENT?: string;
};

// Helper function for injecting server env vars into client -> don't use on client. There everything will be undefined.
// On client use "useEnvVars()" hook
export const getEnvVarsObject = () => {
    return {
        RUNTIME_ENVIRONMENT: process.env.RUNTIME_ENVIRONMENT,
    } as EnvVars;
};
