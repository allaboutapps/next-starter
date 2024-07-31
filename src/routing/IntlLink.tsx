"use client";

import { useLocale } from "@/hooks/useLocale";
import Link, { LinkProps } from "next/link";
import { routeWithLocale } from "./useIntlRouter";

// Use this component to create links with the correct language prefix automatically
export const IntlLink = ({
    href,
    children,
    ...props
}: { href: string; children?: React.ReactNode } & Omit<LinkProps, "href">) => {
    const locale = useLocale();
    return (
        <Link href={routeWithLocale(locale, href)} {...props}>
            {children}
        </Link>
    );
};
