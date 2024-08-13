import { Icon } from "@/components/Icon";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { Button, IconButton } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

export default {
    title: "Buttons",
} satisfies Meta;

export const Contained: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
                <Button variant="contained" color="secondary">
                    Secondary
                </Button>
            </SiteContainer>
        );
    },
};

export const Outlined: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <Button variant="outlined" color="primary">
                    Outlined Primary
                </Button>
                <Button variant="outlined" color="primary">
                    Outlined Secondary
                </Button>
            </SiteContainer>
        );
    },
};

export const Icons: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <div className="flex gap-2 items-center">
                    Icon button:
                    <IconButton>
                        <Icon name="close" />
                    </IconButton>
                </div>
            </SiteContainer>
        );
    },
};
