"use client";

import { CustomInputField } from "@/components/ui/CustomInputField";
import { t } from "@/i18n/clientUtil";
import { useLogin } from "@/network/api/useLogin";
import { Routes } from "@/routing/Routes";
import { useIntlRouter } from "@/routing/useIntlRouter";
import { useAuthStoreHydration } from "@/stores/authStore";
import { useGeneralStore } from "@/stores/generalStore";
import { Colors } from "@/styles/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import logo from "/public/assets/images/logo.png";
import Image from "next/image";

interface LoginValues {
    email: string;
    password: string;
}

export const AuthLoginSite = () => {
    const { handleSubmit, formState, control } = useForm<LoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
        resolver: yupResolver(
            Yup.object().shape({
                email: Yup.string()
                    .email(t("screen.login.form.email.validation_error"))
                    .required(t("screen.login.form.email.validation_error"))
                    .trim(),
                password: Yup.string()
                    .min(6, t("screen.login.form.password.validation_error"))
                    .required(t("screen.login.form.password.validation_error")),
            }),
        ),
    });

    const [error, setError] = React.useState<string>();
    const router = useIntlRouter();

    const isRehydrated = useAuthStoreHydration();

    const loginMutation = useLogin();

    const setIsLoading = useGeneralStore((state) => state.setIsLoading);

    const onSubmit = async (model: LoginValues) => {
        setIsLoading(true);
        setError("");

        try {
            await loginMutation.mutateAsync({ username: model.email, password: model.password });
            router.push(Routes.DASHBOARD);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(`${t("screen.login.error_during_login")}: ${error.response?.status}`);
            }
        }

        setIsLoading(false);
    };

    if (!isRehydrated) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 0%",
                padding: 24,
            }}
        >
            {/* No height param needed because image is imported.
            Alternatively you can provide static images with src="/assets/images/logo.png"
            but then the normal NextJS Image rules apply (height, width needed) */}
            <Image src={logo} alt="Logo" width={200} />
            <div
                style={{
                    background: "#fff",
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 320,
                    marginTop: 40,
                }}
            >
                <div
                    style={{
                        background: Colors.PRIMARY_COLOR,
                        color: "#fff",
                        textTransform: "uppercase",
                        padding: 24,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        fontWeight: "bold",
                    }}
                >
                    {t("screen.login.title")}
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ padding: 24, border: `1px solid ${Colors.PRIMARY_COLOR}`, borderTop: "none" }}
                >
                    <CustomInputField
                        name="email"
                        control={control}
                        label={t("screen.login.form.email.label")}
                        type="email"
                        autoComplete="username"
                        required
                    />

                    <CustomInputField
                        name="password"
                        control={control}
                        label={t("screen.login.form.password.label")}
                        type="password"
                        autoComplete="current-password"
                        required
                    />

                    {error && <div style={{ color: Colors.ERROR, fontSize: 14 }}>{error}</div>}
                    <Button
                        variant="contained"
                        style={{
                            boxShadow: "none",
                            borderRadius: 24,
                            marginTop: 24,
                        }}
                        fullWidth
                        disabled={formState.isSubmitting}
                        type="submit"
                    >
                        {t("screen.login.form.submit")}
                    </Button>
                </form>
            </div>
        </div>
    );
};
