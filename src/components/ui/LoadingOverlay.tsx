"use client";

import { LOADING_INDICATOR_DELAY_MS } from "@/config";
import { useGeneralStore } from "@/stores/generalStore";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const DelayedLoadingOverlay = ({ delayMs = LOADING_INDICATOR_DELAY_MS }: { delayMs?: number }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), delayMs ?? 0);
        return () => clearTimeout(timeout);
    }, [delayMs]);

    if (!show) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                position: "fixed",
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.75)",
                alignItems: "center",
                justifyContent: "center",
                left: 0,
                top: 0,
                zIndex: 9999,
            }}
        >
            <CircularProgress color="secondary" />
        </div>
    );
};

export const LoadingOverlay = (props: { delayMs?: number }) => {
    const isLoading = useGeneralStore((state) => state.isLoading);
    return isLoading ? <DelayedLoadingOverlay delayMs={props.delayMs} /> : null;
};
