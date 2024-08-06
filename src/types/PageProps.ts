import { Locales } from "@/i18n/locales";

export type PageProps = {
    params: { lang: Locales };
    searchParams?: { [key: string]: string | string[] | undefined };
};
