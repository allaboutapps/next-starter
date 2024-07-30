"use client";

import { t } from "@/i18n/clientUtil";
import { Routes } from "@/routing/Routes";
import { useIntlRouter } from "@/routing/useIntlRouter";
import { Button } from "@mui/material";

export default function DashboardPage() {
    const router = useIntlRouter();
    return (
        <div>
            {t("screen.dashboard.hello")}
            <Button
                onClick={() => {
                    router.push(Routes.ROOT);
                }}
            >
                Back to Root
            </Button>
        </div>
    );
}
