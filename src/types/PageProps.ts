import { Locales } from "@/i18n/locales";

export type PageProps = {
    params: Promise<{ lang: Locales }>;
};
