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

const skeletonTimeout = { enter: 50, exit: 500 };
const contentTimeout = { enter: 500, exit: 50 };
const SkeletonWrapper = ({ children, loading, variant, ...skeletonProps }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Fade in={loading} unmountOnExit timeout={skeletonTimeout}>
                <Skeleton
                    animation="wave"
                    variant={variant || "rect"}
                    className={classes.skeletonRoot}
                    {...skeletonProps}
                />
            </Fade>
            <Fade in={!loading} timeout={contentTimeout}>
                <div>{children}</div>
            </Fade>
        </div>
    );
};

export default SkeletonWrapper;
