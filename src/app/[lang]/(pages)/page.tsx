import { PageProps } from "@/types/PageProps";
import { HomeSite } from "./HomeSite";

export default function HomeSiteServer(props: PageProps) {
    return <HomeSite pageProps={props} />;
}
