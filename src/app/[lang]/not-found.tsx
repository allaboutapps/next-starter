"use client";

import { t } from "@/i18n/clientUtil";
import "../../styles/globals.css";

/**
 * The 404 page has been converted into a client-side component
 * to allow reading the locale using the useLocale hook. Why is this necessary?
 * NextJS does not pass page props to the not-found page.
 * https://github.com/vercel/next.js/discussions/43179#discussioncomment-9738369
 */
export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {t("screen.not_found.title")}
        </main>
    );
}
