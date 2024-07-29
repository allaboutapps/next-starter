import { Locales } from "@/i18n/locales";
import { tServer } from "@/i18n/util";
import { MuiTest } from "./MuiTest";
import { Icon } from "@/components/Icon";

type Props = {
    params: { lang: Locales };
};

export default function Home({ params }: Props) {
    return (
        <main className="flex flex-col grow min-h-screen items-center p-24">
            {tServer(params.lang, "serverComponent.text")}
            <MuiTest />
            <h1 className="text-primary">H1 headline</h1>
            <h2>H2 headline</h2>
            <h3>H3 headline</h3>
            <h4>H4 headline</h4>
            <p>Paragraph body1</p>
            <p className="body2">Paragraph body2</p>
            <Icon name="close" />
        </main>
    );
}
