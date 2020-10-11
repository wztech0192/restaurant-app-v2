import React from "react";
import { TextField } from "@material-ui/core";

const TextFieldWrapper = ({
    value = "",
    variant = "outlined",
    error,
    helperText,
    name,
    margin = "normal",
    fullWidth = true,
    ...props
}) => {
    if (typeof error === "object") {
        error = error[name];
    }
    return (
        <TextField
            {...props}
            value={value}
            variant={variant}
            name={name}
            error={!!error}
            helperText={error || helperText}
            margin={margin}
            fullWidth={fullWidth}
        />
    );
};

export default TextFieldWrapper;
