import { SiteContainer } from "@/components/ui/SiteContainer";
import { tServer } from "@/i18n/util";
import { IntlLink } from "@/routing/IntlLink";
import { Routes } from "@/routing/Routes";
import { PageProps } from "@/types/PageProps";
import { Link } from "@mui/material";

export const HomeSite = async ({ pageProps }: { pageProps: PageProps }) => {
    const lang = pageProps.params.lang;

    /* CRAFT_COMMENT_IN
    const craftPreview = getCraftPreviewParams(pageProps.searchParams);
    const result = await fetchHome(lang, craftPreview);
    const query = result?.data;

    if (!query?.entry) {
        return notFound();
    }
    */

    return (
        <SiteContainer>
            {/* CRAFT_COMMENT_IN GraphQL Home: {query.entry.title} */}
            <Link href={Routes.LOGIN} component={IntlLink}>
                {tServer(lang, "common.login")}
            </Link>
            <Link href={Routes.DASHBOARD} component={IntlLink}>
                {tServer(lang, "common.dashboard")}
            </Link>
        </SiteContainer>
    );
};
