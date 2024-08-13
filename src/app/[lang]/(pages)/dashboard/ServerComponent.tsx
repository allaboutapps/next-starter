import { tServer } from "@/i18n/util";
import { PageProps } from "@/types/PageProps";
import { debug } from "@/util/debug";
import { sleep } from "@/util/helpers";

// Example for an async RSC (introduced with React 18)
// RSC can be async and make API calls or access DB before rendering.
// Since they are more complex than client components especially with regards to
// caching we recommend using client components in most cases.
// ATTENTION: Client components contrary to their name are still prerendered on the server.
// So you still get the benefits of SSR.
export const ServerComponent = async ({ pageProps }: { pageProps: PageProps }) => {
    // Simulate some server loading
    debug.log("loading ServerComponent");
    await sleep(100);
    debug.log("loading ServerComponent done");

    return <>{tServer(pageProps.params.lang, "serverComponent.text")}</>;
};
