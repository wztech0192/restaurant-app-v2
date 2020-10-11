import React from "react";
import { makeStyles, TextField } from "@material-ui/core";

const TextFieldWrapper = ({
    value = "",
    variant = "outlined",
    error,
    helperText,
    name,
    margin = "normal",
    fullWidth = true,
    solid,
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
