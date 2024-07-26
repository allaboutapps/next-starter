import { PrimitiveType } from "intl-messageformat";
import { german } from "./de";
import { english } from "./en";
import { locales, Locales } from "./locales";

type IMessages = {
    [locale in Locales]: {
        [message: string]: string;
    };
};

export const intlMessages: IMessages = {
    de: german,
    en: english,
};

export type MessageIDS = keyof typeof german;

// Use this in React server components
export function tServer(lang: Locales, id: MessageIDS, values?: Record<string, PrimitiveType>) {
    if (locales.indexOf(lang) === -1) {
        // Not a valid language -> return the id
        return id;
    }

    const language = intlMessages[lang];
    const value = language[id];
    return value.replace(/{([^}]+)}/g, (match: string, group: any) => {
        return (values?.[group] ?? match) as string;
    });
}
