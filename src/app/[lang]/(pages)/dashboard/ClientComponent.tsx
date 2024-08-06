"use client";

import NextLink from "next/link";
import { t, tHtml } from "@/i18n/clientUtil";
import { Button, Link } from "@mui/material";
import { sleep } from "@/util/helpers";
import { useGeneralStore } from "@/stores/generalStore";
import { IntlLink } from "@/routing/IntlLink";
import { useLocale } from "@/hooks/useLocale";
import { Routes } from "@/routing/Routes";
import { useIntlRouter } from "@/routing/useIntlRouter";
import { useDebugStore } from "@/stores/debugStore";

// Stuff that has to be in a client component (uses t, tHtml)
export const ClientComponent = () => {
    const [setIsLoading, setError] = useGeneralStore((state) => [state.setIsLoading, state.setError]);
    const locale = useLocale();
    const router = useIntlRouter();
    const debugEnabled = useDebugStore((state) => state.enabled);

    const loading = (
        <>
            <Button
                variant="outlined"
                onClick={async () => {
                    setIsLoading(true);
                    await sleep(100);
                    setIsLoading(false);
                }}
            >
                {t("button.loadingShort")}
            </Button>
            <Button
                variant="outlined"
                onClick={async () => {
                    setIsLoading(true);
                    await sleep(1000);
                    setIsLoading(false);
                }}
            >
                {t("button.loadingLong")}
            </Button>
        </>
    );

    return (
        <>
            <IntlLink href={Routes.ROOT}>
                <Button>{t("common.home")}</Button>
            </IntlLink>
            <Button
                variant="contained"
                onClick={() => {
                    if (locale === "de") {
                        router.switchLanguage("/en//");
                    } else {
                        router.switchLanguage("de");
                    }
                }}
            >
                {t(locale === "de" ? "language.english" : "language.german")}
            </Button>
            <div>Debug: {debugEnabled ? "enabled" : "disabled"}</div>
            {loading}
            <Button
                variant="outlined"
                onClick={async () => {
                    setError(t("error.general"));
                }}
            >
                {t("button.showError")}
            </Button>
            <Link href="/assets/third-party-licenses.txt" component={NextLink}>
                {t("common.licenses")}
            </Link>
            <div>{tHtml("screen.dashboard.html")}</div>
        </>
    );
};
