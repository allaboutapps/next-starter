"use client";

import { useDebugCommands } from "@/hooks/useDebugCommands";

export const DebugProvider = ({ children }: { children: React.ReactNode }) => {
    useDebugCommands();

    return <>{children}</>;
};
