"use client";

import { UrqlProvider } from "@urql/next";
import { useMemo } from "react";
import "../styles/globals.css";
import { buildBrowserUrqlClient } from "./browserUrqlClient";
import { HostSettings } from "@/hostSettings";

export const GraphQlProvider = (props: { hostSettings?: HostSettings; children: React.ReactNode }) => {
    const [client, ssr] = useMemo(() => {
        return buildBrowserUrqlClient(props.hostSettings);
    }, [props.hostSettings]);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            {props.children}
        </UrqlProvider>
    );
};
