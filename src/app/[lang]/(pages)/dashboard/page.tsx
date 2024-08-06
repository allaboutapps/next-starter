import { PageProps } from "@/types/PageProps";
import { DashboardSite } from "./DashboardSite";

export default function DashboardSiteServer(props: PageProps) {
    return <DashboardSite pageProps={props} />;
}
