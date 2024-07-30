"use client";

import { useGeneralStore } from "@/stores/generalStore";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { reactQueryClient } from "../../network/reactQueryClient";

export const ReactQueryProvider = ({
    runtimeEnvironment,
    children,
}: {
    runtimeEnvironment: string;
    children: React.ReactNode;
}) => {
    const generalStore = useGeneralStore();

    // No exhaustive deps, because we don't want generalStore to be a dependency
    // Here we set the runtime environment in the general store so we can use getHostSettings() on the client side
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => generalStore.setRuntimeEnvironment(runtimeEnvironment), [runtimeEnvironment]);

    return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
};
