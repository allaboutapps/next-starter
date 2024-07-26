"use client";

import { useLocale } from "@/hooks/useLocale";
import { RawIntlProvider } from "react-intl";
import { setLocale } from "./clientUtil";

// For client components we can use t() and tHtml()  with react-intl. For RSC use tServer() instead.
export const ClientIntlProvider = ({ children }: { children: React.ReactNode }) => {
    const locale = useLocale();
    const intl = setLocale(locale);

    return (
        <RawIntlProvider value={intl} key={locale}>
            {children}
        </RawIntlProvider>
    );
};
