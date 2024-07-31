import { DEFAULT_LOCALE, Locales, locales } from "@/i18n/locales";
import { usePathname } from "next/navigation";

const LOCALES = locales as ReadonlyArray<string>;

export const getLocaleFromPathname = (pathname: string) => {
    const locale = pathname.split("/");
    if (locale.length > 1 && LOCALES.includes(locale[1])) {
        const indexOf = LOCALES.indexOf(locale[1]);
        return locales[indexOf];
    }

    return DEFAULT_LOCALE;
};

// Get current locale from current path
export const useLocale = (): Locales => {
    const name = usePathname();
    return getLocaleFromPathname(name);
};
