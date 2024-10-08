import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import * as React from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { FieldError } from "./FieldError";

type IProps<T extends FieldValues> = TextFieldProps &
    UseControllerProps<T> & {
        onChange?: () => void;
        showValidationErrorText?: boolean;
        selectOptions?: { value: string; label: string }[];
    };

export const CustomInputField = <T extends FieldValues>({
    style,
    label,
    type,
    autoComplete,
    multiline,
    minRows,
    maxRows,
    required,
    name,
    control,
    "aria-label": ariaLabel,
    placeholder,
    showValidationErrorText = true,
    selectOptions,
    onChange,
}: IProps<T>) => {
    const { field, fieldState } = useController({ control, name: name ?? "" });

    const fieldError = fieldState.error?.message;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        field.onChange(event);

        onChange?.();
    };

    return (
        <div style={style}>
            <TextField
                select={!!selectOptions}
                label={required ? `${label} *` : label}
                fullWidth
                type={type}
                autoComplete={autoComplete}
                error={!!fieldError}
                margin="dense"
                aria-label={ariaLabel}
                variant="outlined"
                placeholder={placeholder}
                multiline={multiline}
                minRows={minRows}
                maxRows={maxRows}
                // For date inputs shrink does not work correctly so explicitly set it.
                // See here: https://mui.com/material-ui/react-text-field/#shrink
                InputLabelProps={type === "date" ? { shrink: true } : undefined}
                // Injects name, onChange, onBlur, value, ref
                // So if you override an of these you have to put it after this
                {...field}
                onChange={handleChange}
            >
                {selectOptions?.map((selectOption) => (
                    <MenuItem key={selectOption.value} value={selectOption.value}>
                        {selectOption.label}
                    </MenuItem>
                ))}
            </TextField>
            {showValidationErrorText && <FieldError>{fieldError}</FieldError>}
        </div>
    );
};
