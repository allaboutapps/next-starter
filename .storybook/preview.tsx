import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../src/styles/theme";
import { openSans } from "../src/styles/fonts";

import "../src/styles/globals.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <div className={openSans.className}>
                <ThemeProvider theme={theme}>
                    <Story />
                </ThemeProvider>
            </div>
        ),
    ],
};

export default preview;
