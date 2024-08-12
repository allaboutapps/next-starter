import { Button, IconButton } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { SiteContainer } from "./SiteContainer";
import { Icon } from "../Icon";

export default {
    title: "Buttons",
} satisfies Meta;

export const Buttons: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
                <Button variant="contained" color="secondary">
                    Secondary
                </Button>
                <Button variant="outlined" color="primary">
                    Outlined Primary
                </Button>
                <Button variant="outlined" color="primary">
                    Outlined Secondary
                </Button>
                <div className="flex gap-2 items-center">
                    Icon button:
                    <IconButton>
                        <Icon name="close" />
                    </IconButton>
                </div>
            </SiteContainer>
        );
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
};
