"use client";

import { useLocale } from "@/hooks/useLocale";
import { t } from "@/i18n/clientUtil";
import { Routes } from "@/routing/Routes";
import { useIntlRouter } from "@/routing/useIntlRouter";
import { Button } from "@mui/material";
import Link from "next/link";

export const MuiTest = () => {
    const router = useIntlRouter();
    const locale = useLocale();

    // useItems();

    return (
        <div className="flex flex-col gap-4">
            <Link href={router.href(Routes.DASHBOARD)}>
                <Button>Dashboard</Button>
            </Link>
            <Button
                variant="contained"
                onClick={() => {
                    if (locale === "de") {
                        router.switchLanguage("en");
                    } else {
                        router.switchLanguage("de");
                    }
                }}
            >
                {t(locale === "de" ? "language.english" : "language.german")}
            </Button>
            {t("button.showError")}
        </div>
    );
};
