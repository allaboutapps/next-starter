import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, locales } from "./i18n/locales";

// If invalid language provided -> redirect to default language's not found page
const handleLanguageNotFound = (request: NextRequest) => {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    // Locale found -> continue
    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to default-locale/not-found if no locale is found
    const locale = DEFAULT_LOCALE;
    request.nextUrl.pathname = `/${locale}/not-found`;
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
