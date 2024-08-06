"use client";

import { useLocale } from "@/hooks/useLocale";
import Link, { LinkProps } from "next/link";
import { routeWithLocale } from "./useIntlRouter";
import { forwardRef, LegacyRef } from "react";

// Use this component to create links with the correct language prefix automatically
// forwardRef is needed to pass this as component to MUI Link
export const IntlLink = forwardRef(function IntlLink(
    props: { href: string; children?: React.ReactNode } & Omit<LinkProps, "href">,
    ref: LegacyRef<HTMLAnchorElement>,
) {
    const locale = useLocale();
    const { href, children, ...rest } = props;
    return (
        <Link ref={ref} href={routeWithLocale(locale, href)} {...rest}>
            {children}
        </Link>
    );
});
