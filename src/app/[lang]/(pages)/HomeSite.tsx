"use client";

import { SiteContainer } from "@/components/ui/SiteContainer";
import { tServer } from "@/i18n/util";
import { IntlLink } from "@/routing/IntlLink";
import { Routes } from "@/routing/Routes";
import { PageProps } from "@/types/PageProps";
import { Link } from "@mui/material";

export const HomeSite = ({ pageProps }: { pageProps: PageProps }) => {
    const lang = pageProps.params.lang;
    return (
        <SiteContainer>
            <Link href={Routes.LOGIN} component={IntlLink}>
                {tServer(lang, "common.login")}
            </Link>
            <Link href={Routes.DASHBOARD} component={IntlLink}>
                {tServer(lang, "common.dashboard")}
            </Link>
        </SiteContainer>
    );
};
