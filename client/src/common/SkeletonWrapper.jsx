import React from "react";
import { Fade, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
    root: {
        position: "relative"
    },
    skeletonRoot: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%"
    }
});

const SkeletonWrapper = ({ children, loading, variant, ...skeletonProps }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Fade in={loading}>
                <Skeleton
                    animation="wave"
                    variant={variant || "rect"}
                    className={classes.skeletonRoot}
                    {...skeletonProps}
                />
            </Fade>
            <Fade in={!loading}>
                <div>{children}</div>
            </Fade>
        </div>
    );
};

export default SkeletonWrapper;
