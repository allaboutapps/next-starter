"use client";

import { t } from "@/i18n/clientUtil";
import { Button } from "@mui/material";

export const MuiTest = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button>Flat</Button>
            <Button variant="contained">Contained</Button>
            {t("button.showError")}
        </div>
    );
};
