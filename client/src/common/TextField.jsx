import React from "react";
import { makeStyles, TextField } from "@material-ui/core";

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

const TextFieldWrapper = ({
    value = "",
    variant,
    error,
    helperText,
    name,
    margin,
    fullWidth = true,
    solid,
    ...props
}) => {
    const classes = useStyles();
    if (error && typeof error === "object") {
        error = error[name];
    }

    if (solid && !variant) {
        variant = "standard";
    }

    return (
        <TextField
            {...props}
            className={solid ? classes.solid : undefined}
            value={value}
            variant={variant || "outlined"}
            name={name}
            error={!!error}
            helperText={error || helperText}
            margin={margin || "normal"}
            fullWidth={fullWidth}
        />
    );
};

export default TextFieldWrapper;
