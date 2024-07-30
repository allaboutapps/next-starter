import { useLocale } from "@/hooks/useLocale";
import { NavigateOptions, PrefetchOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";

// Wrapper around next router handling localization and language switching
export const useIntlRouter = () => {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();
    const pathNameWithoutLocale = pathname.split("/").slice(2).join("/");

    return {
        forward: router.forward,
        back: router.back,
        refresh: router.refresh,
        push: (path: string, options?: NavigateOptions) => router.push(`/${locale}${path}`, options),
        replace: (path: string, options?: NavigateOptions) => router.replace(`/${locale}${path}`, options),
        prefetch: (path: string, options?: PrefetchOptions) => router.prefetch(`/${locale}${path}`, options),
        switchLanguage: (lang: string) => router.push(`/${lang}${pathNameWithoutLocale}`),
    };
};
