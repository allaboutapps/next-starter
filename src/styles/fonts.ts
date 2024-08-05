import localFont from "next/font/local";

export const openSans = localFont({
    variable: "--font-open-sans",
    src: [
        {
            style: "normal",
            weight: "400",
            path: "../../public/assets/fonts/open-sans-v34-latin-regular.woff2",
        },
        {
            style: "bold",
            weight: "700",
            path: "../../public/assets/fonts/open-sans-v34-latin-700.woff2",
        },
    ],
});
