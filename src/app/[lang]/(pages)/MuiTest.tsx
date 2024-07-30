"use client";

import { useLocale } from "@/hooks/useLocale";
import { t } from "@/i18n/clientUtil";
import { Routes } from "@/routing/Routes";
import { useIntlRouter } from "@/routing/useIntlRouter";
import { Button } from "@mui/material";

export const MuiTest = () => {
    const router = useIntlRouter();
    const locale = useLocale();

    return (
        <div className="flex flex-col gap-4">
            <Button
                onClick={() => {
                    router.push(Routes.DASHBOARD);
                }}
            >
                Dashboard
            </Button>
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
