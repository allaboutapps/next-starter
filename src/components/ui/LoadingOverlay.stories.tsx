import { SiteContainer } from "@/components/ui/SiteContainer";
import { tServer } from "@/i18n/util";
import { useGeneralStore } from "@/stores/generalStore";
import { sleep } from "@/util/helpers";
import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { LoadingOverlay } from "./LoadingOverlay";

export default {
    title: "Loading Overlay",
} satisfies Meta;

export const TriggerOverlay: StoryObj = {
    render: () => {
        const [setIsLoading] = useGeneralStore((state) => [state.setIsLoading]);

        return (
            <SiteContainer>
                <Button
                    variant="outlined"
                    onClick={async () => {
                        setIsLoading(true);
                        await sleep(100);
                        setIsLoading(false);
                    }}
                >
                    {tServer("de", "button.loadingShort")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={async () => {
                        setIsLoading(true);
                        await sleep(2000);
                        setIsLoading(false);
                    }}
                >
                    {tServer("de", "button.loadingLong")}
                </Button>
                <LoadingOverlay />
            </SiteContainer>
        );
    },
};
