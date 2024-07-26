export const locales = ["de", "en"] as const;
export type Locales = (typeof locales)[number];

export const DEFAULT_LOCALE = "de";
