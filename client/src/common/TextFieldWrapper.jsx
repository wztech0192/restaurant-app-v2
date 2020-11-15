import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import PhoneMask from "./phoneMask";

const useStyles = makeStyles(theme => ({
    solid: {
        "& .Mui-disabled": {
            color: "inherit"
        },

        "& .MuiFormLabel-root.Mui-disabled": {
            color: "rgba(0, 0, 0, 0.54)"
        }
    }
}));

const phoneMaskInputProps = {
    inputComponent: PhoneMask
};

const TextFieldWrapper = ({
    phoneMask,
    value,
    variant,
    error,
    helperText,
    name,
    margin,
    fullWidth = true,
    solid,
    InputProps,
    ...props
}) => {
    const classes = useStyles();
    if (error && typeof error === "object") {
        error = error[name];
    }

    if (solid && !variant) {
        variant = "standard";
    }

    const _helperText = error || helperText;
    return (
        <TextField
            {...props}
            InputProps={InputProps || (phoneMask ? phoneMaskInputProps : undefined)}
            className={solid ? classes.solid : undefined}
            value={value || ""}
            variant={variant || "outlined"}
            name={name}
            error={Boolean(error)}
            helperText={typeof _helperText === "string" ? _helperText : ""}
            margin={margin || "normal"}
            fullWidth={fullWidth}
        />
    );
};

export default TextFieldWrapper;
