"use client";

import { useLocale } from "@/hooks/useLocale";
import { useSearchParams } from "next/navigation";
import { RawIntlProvider } from "react-intl";
import { setLocale } from "./clientUtil";

// For client components we can use t() and tHtml()  with react-intl. For RSC use tServer() instead.
export const ClientIntlProvider = ({ children }: { children: React.ReactNode }) => {
    const locale = useLocale();
    const intl = setLocale(locale);

    // Inject showStringKeys into the intl object
    const searchParams = useSearchParams();
    const showStringKeys = searchParams.get("showStringKeys");
    intl.showStringKeys = showStringKeys === "true";

    return (
        <RawIntlProvider value={intl} key={locale}>
            {children}
        </RawIntlProvider>
    );
};
