"use client";

import { getPublicEnvVarsObject, PublicEnvVars } from "@/config";

// Server side init via process.env
export let publicEnvVars = getPublicEnvVarsObject();

// Make server side environment variables available to client side
export const EnvVarsProvider = ({ env, children }: { env: PublicEnvVars; children: React.ReactNode }) => {
    publicEnvVars = env;
    return <>{children}</>;
};
