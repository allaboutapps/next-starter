import { SiteContainer } from "@/components/ui/SiteContainer";
import { Meta, StoryObj } from "@storybook/react";

export default {
    title: "Text Styles",
} satisfies Meta;

export const Headlines: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <h1 className="text-primary">H1 headline</h1>
                <h2>H2 headline</h2>
                <h3>H3 headline</h3>
                <h4>H4 headline</h4>
            </SiteContainer>
        );
    },
};

export const Paragraphs: StoryObj = {
    render: () => {
        return (
            <SiteContainer>
                <p>Paragraph body1</p>
                <p className="body2">Paragraph body2</p>
            </SiteContainer>
        );
    },
};
