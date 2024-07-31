"use client";

import { EnvVars } from "@/config";
import { useGeneralStore } from "@/stores/generalStore";
import React, { useEffect } from "react";

// Make server side environment variables available to client side
export const EnvVarsProvider = ({ env, children }: { env: EnvVars; children: React.ReactNode }) => {
    const generalStore = useGeneralStore();

    useEffect(() => {
        generalStore.setEnvVars(env);

        // No exhaustive deps, because we don't want generalStore to be a dependency -> infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [env]);

    return <>{children}</>;
};
