import { useGeneralStore } from "@/stores/generalStore";
import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { ErrorToast } from "./ErrorToast";
import { SiteContainer } from "./SiteContainer";

export default {
    title: "Error Toast",
} satisfies Meta;

export const TriggerError: StoryObj = {
    render: () => {
        const [setError] = useGeneralStore((state) => [state.setError]);

        return (
            <SiteContainer>
                <Button variant="contained" color="primary" onClick={() => setError("Something went wrong!")}>
                    Trigger error
                </Button>
                <ErrorToast />
            </SiteContainer>
        );
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
};
