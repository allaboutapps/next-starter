import { Locales, locales } from "@/config";
import { usePathname } from "next/navigation";

const LOCALES = locales as ReadonlyArray<string>;

// Get current locale from current path
export const useLocale = (): Locales => {
    const name = usePathname();
    const locale = name.split("/");
    if (locale.length > 1 && LOCALES.includes(locale[1])) {
        const indexOf = LOCALES.indexOf(locale[1]);
        return locales[indexOf];
    }

    return "de";
};
