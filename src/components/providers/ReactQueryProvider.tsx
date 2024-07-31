"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { reactQueryClient } from "../../network/reactQueryClient";

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
};
