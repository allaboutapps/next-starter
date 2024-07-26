import { Locales } from "@/i18n/locales";
import { tServer } from "@/i18n/util";
import { MuiTest } from "./MuiTest";

type Props = {
    params: { lang: Locales };
};

export default function Home({ params }: Props) {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            {tServer(params.lang, "serverComponent.text")}
            <MuiTest />
        </main>
    );
}
