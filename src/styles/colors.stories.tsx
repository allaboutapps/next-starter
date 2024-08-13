import { SiteContainer } from "@/components/ui/SiteContainer";
import { Meta, StoryObj } from "@storybook/react";
import { Colors as C } from "./colors";

export default {
    title: "Colors",
} satisfies Meta;

export const ColorPalette: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <div className="flex flex-col gap-4">
                    {Object.entries(C).map((entry) => (
                        <div key={entry[0]} className="flex justify-between">
                            {`${entry[0]}: `}
                            <div style={{ marginLeft: 16, width: 100, height: 32, backgroundColor: entry[1] }} />
                        </div>
                    ))}
                </div>
            </SiteContainer>
        );
    },
};
