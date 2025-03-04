import { SiteContainer } from "@/components/ui/SiteContainer";
import { PageProps } from "@/types/PageProps";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";
import { ClientComponent } from "./ClientComponent";
import { ServerComponent } from "./ServerComponent";

export const DashboardSite = ({ pageProps }: { pageProps: PageProps }) => {
    return (
        <SiteContainer>
            <Suspense fallback={<Skeleton variant="text" animation="wave" width={300} />}>
                <ServerComponent pageProps={pageProps} />
            </Suspense>
            <ClientComponent />
        </SiteContainer>
    );
};
