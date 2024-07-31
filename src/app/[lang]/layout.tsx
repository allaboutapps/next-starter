import { EnvVarsProvider } from "@/components/providers/EnvVarsProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { getEnvVarsObject } from "@/config";
import { ClientIntlProvider } from "@/i18n/ClientIntlProvider";
import { openSans } from "@/styles/fonts";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import "../../styles/globals.css";
import { theme } from "../../styles/theme";

export const metadata: Metadata = {
    title: "aaa next-starter",
    description: "Generated by create next app",
};

type Props = {
    params: { lang: string };
    children: React.ReactNode;
};

export default function RootLayout({ params, children }: Props) {
    return (
        <html lang={params.lang} className={openSans.className}>
            <body>
                <AppRouterCacheProvider>
                    <ClientIntlProvider>
                        <EnvVarsProvider env={getEnvVarsObject()}>
                            <ReactQueryProvider>
                                <ThemeProvider theme={theme}>{children}</ThemeProvider>
                            </ReactQueryProvider>
                        </EnvVarsProvider>
                    </ClientIntlProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}