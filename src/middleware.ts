import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, locales } from "./i18n/locales";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// true if string is locale
function isValidLocale(locale: string): boolean {
    // Regular expression for basic validation
    const localePattern = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?(-[A-Za-z0-9]{5,8})?$/;

    if (!localePattern.test(locale)) {
        return false;
    }

    // Check with Intl.Locale if available
    if (typeof Intl !== "undefined" && typeof Intl.Locale === "function") {
        try {
            new Intl.Locale(locale);
            return true;
        } catch {
            return false;
        }
    }

    // If Intl.Locale is not available, rely on basic pattern matching
    return true;
}

// From request headers get best matching language
function getLocale(request: NextRequest) {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

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

    // Determine best matching locale
    const locale = getLocale(request);

    // Check if first part of pathname is a valid locale
    const pathnameLocale = pathname.split("/")[1];
    if (isValidLocale(pathnameLocale)) {
        // Yes -> someone tried to access a valid locale but it's not supported
        request.nextUrl.pathname = `/${locale}/not-found`;
    } else {
        // No -> redirect to matching locale with pathname appended
        request.nextUrl.pathname = `/${locale}${pathname}`;
    }

    // If for the default language you don't want the /lang/ prefix we could use NextResponse.rewrite() instead and also have
    // to consider this for hrefs in Next Link.
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
         * - assets (public/assets)
         */
        "/((?!api|_next|favicon.ico|assets).*)",
    ],
};
