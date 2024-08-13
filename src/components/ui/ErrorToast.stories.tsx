import { ErrorToast } from "@/components/ui/ErrorToast";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { useGeneralStore } from "@/stores/generalStore";
import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

export default {
    title: "Error Toast",
} satisfies Meta;

export const TriggerSingleError: StoryObj = {
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
};
