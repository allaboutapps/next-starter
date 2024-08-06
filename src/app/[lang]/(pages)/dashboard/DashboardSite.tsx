import { SiteContainer } from "@/components/ui/SiteContainer";
import { PageProps } from "@/types/PageProps";
import { ClientComponent } from "./ClientComponent";
import { ServerComponent } from "./ServerComponent";

export const DashboardSite = ({ pageProps }: { pageProps: PageProps }) => {
    return (
        <SiteContainer>
            <ServerComponent pageProps={pageProps} />
            <ClientComponent />
        </SiteContainer>
    );
};
