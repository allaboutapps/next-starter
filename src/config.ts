import { PHASE_PRODUCTION_BUILD } from "next/constants";

export const MOBILE_BREAKPOINT = 768;

export const DEBUG = true;

export const IS_SERVER = typeof window === "undefined";

export const IS_BUILD = process?.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;

export type PublicEnvVars = {
    RUNTIME_ENVIRONMENT?: string;
};

// Helper function for injecting server env vars into client -> don't use on client. There everything will be undefined.
// Use publicEnvVars instead.
// ONLY EXPOSES PUBLIC ENVIRONMENT VARIABLES TO CLIENT (similar to NEXT_PUBLIC_*). Do not expose any sensitive information here.
export const getPublicEnvVarsObject = () => {
    return {
        RUNTIME_ENVIRONMENT: process.env.RUNTIME_ENVIRONMENT,
    } as PublicEnvVars;
};
