import { tServer } from "@/i18n/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { CustomInputField } from "./CustomInputField";
import { SiteContainer } from "./SiteContainer";

export default {
    title: "Inputs",
} satisfies Meta;

export const Inputs: StoryObj = {
    render: () => {
        const { control } = useForm<{ email: string }>({
            defaultValues: {
                email: "",
            },
            mode: "onTouched",
            resolver: yupResolver(
                Yup.object().shape({
                    email: Yup.string()
                        .email(tServer("de", "screen.login.form.email.validation_error"))
                        .required(tServer("de", "screen.login.form.email.validation_error"))
                        .trim(),
                }),
            ),
        });

        return (
            <SiteContainer>
                <CustomInputField
                    name="email"
                    control={control}
                    label={tServer("de", "screen.login.form.email.label")}
                    type="email"
                    autoComplete="username"
                    required
                />
            </SiteContainer>
        );
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
};
