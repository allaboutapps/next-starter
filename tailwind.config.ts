import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                // Define colors so e.g. you can use "text-primary" in your CSS
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                primaryActive: "var(--primary-active)",
                secondaryActive: "var(--secondary-active)",
                body1: "var(--body1)",
                body2: "var(--body2)",
                headings: "var(--headings)",
            },
        },
    },
    plugins: [
        plugin(function ({ addBase, addUtilities }) {
            addBase({
                /**
                 *  BASE TEXT STYLES
                 */
                h1: { fontSize: "32px", fontWeight: "bold" },
                h2: { fontSize: "24px", fontWeight: "bold" },
                h3: { fontSize: "20px", fontWeight: "bold" },
                h4: { fontSize: "16px", fontWeight: "bold" },
                p: { fontSize: "14px", color: "var(--body1)" },
            }),
                addUtilities({
                    /**
                     *  CUSTOM TEXT STYLES
                     */
                    ".body1": {
                        fontSize: "14px",
                        color: "var(--body1)",
                    },
                    ".body2": {
                        // Not necessary here, just demonstrating how to use custom font loaded in fonts.ts
                        fontFamily: "var(--font-open-sans)",

                        fontSize: "12px",
                        color: "var(--body2)",
                    },
                });
        }),
    ],
};
export default config;
