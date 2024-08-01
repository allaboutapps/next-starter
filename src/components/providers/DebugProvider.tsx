"use client";

import { useDebugCommands } from "@/hooks/useDebugCommands";
import { useEffect } from "react";

export const DebugProvider = ({ children }: { children: React.ReactNode }) => {
    useDebugCommands();

    // Add commit hash as header comment for deployed versions
    useEffect(() => {
        const version = document.createComment(`Version ${process.env.NEXT_PUBLIC_COMMIT_HASH}`);
        document.head.prepend(version);
    }, []);

    return <>{children}</>;
};
