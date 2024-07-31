import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, locales } from "./i18n/locales";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// From request headers get best matching language
function getLocale(request: NextRequest) {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const lang = match(languages, locales, DEFAULT_LOCALE);
    return lang;
}

// If invalid language provided -> redirect to default language's not found page
const handleLanguageNotFound = (request: NextRequest) => {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    // Locale found -> continue
    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to default-locale/pathname if no locale found
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
};

export const middleware = (request: NextRequest) => {
    const { method, nextUrl } = request;
    if (process.env.ENABLE_ACCESS_LOG) {
        console.log(
            `[${method}] ${nextUrl.pathname}${nextUrl.search ? ` search=${nextUrl.search}` : ""}${
                nextUrl.hash ? ` hash=${nextUrl.hash}` : ""
            }`,
        );
    }

    return handleLanguageNotFound(request);
};

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next|favicon.ico).*)",
    ],
};
