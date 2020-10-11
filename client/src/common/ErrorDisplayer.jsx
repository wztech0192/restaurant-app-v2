import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        margin: 0
    }
});

const ErrorDisplayer = ({ errors }) => {
    const classes = useStyles();

    let isObject = typeof errors === "object";

    if (isObject) {
        if (!Array.isArray(errors)) {
            errors = Object.entries(errors).map(([key, value]) => value);
        }
        if (errors.length === 1) {
            isObject = false;
            errors = errors[0];
        }
    }

    return isObject ? (
        <ul className={classes.list}>
            {errors.map(error => (
                <Typography component="li" color="error">
                    {error}
                </Typography>
            ))}
        </ul>
    ) : (
        <Typography color="error">{errors}</Typography>
    );
};

export default ErrorDisplayer;
