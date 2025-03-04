"use client";

import { useLocale } from "@/hooks/useLocale";
import { t, tHtml } from "@/i18n/clientUtil";
import { IntlLink } from "@/routing/IntlLink";
import { Routes } from "@/routing/Routes";
import { useIntlRouter } from "@/routing/useIntlRouter";
import { useDebugStore } from "@/stores/debugStore";
import { Button, Link, TextField } from "@mui/material";
import NextLink from "next/link";
import { useQueryState } from "nuqs";

// Stuff that has to be in a client component (uses t, tHtml)
export const ClientComponent = () => {
    const locale = useLocale();
    const router = useIntlRouter();
    const debugEnabled = useDebugStore((state) => state.enabled);

    const [search, setSearch] = useQueryState("search", {
        shallow: true,
    });

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
            <Link href="/assets/third-party-licenses.txt" component={NextLink}>
                {t("common.licenses")}
            </Link>
            <div>{tHtml("screen.dashboard.html")}</div>
            <TextField
                value={search ?? ""}
                onChange={(e) => setSearch(e.target.value || null)}
                placeholder={t("search.placeholder")}
            />
            <div>Query Param {`{search : ${search}}`}</div>
        </>
    );
};
