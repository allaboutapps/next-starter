import { Icon } from "@/components/Icon";
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

    return (
        <>
            {tServer(pageProps.params.lang, "serverComponent.text")}
            <h1 className="text-primary">H1 headline</h1>
            <h2>H2 headline</h2>
            <h3>H3 headline</h3>
            <h4>H4 headline</h4>
            <p>Paragraph body1</p>
            <p className="body2">Paragraph body2</p>
            <Icon name="close" />
        </>
    );
};
