"use client";

import { getHostSettings } from "@/hostSettings";
import { buildBrowserUrqlClient } from "@/network/browserUrqlClient";
import { UrqlProvider } from "@urql/next";
import { useMemo } from "react";

export const GraphQlProvider = (props: { children: React.ReactNode }) => {
    const [client, ssr] = useMemo(() => {
        const hostSettings = getHostSettings();
        return buildBrowserUrqlClient(hostSettings);
    }, []);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            {props.children}
        </UrqlProvider>
    );
};
