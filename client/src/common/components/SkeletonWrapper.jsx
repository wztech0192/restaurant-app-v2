import React from "react";
import { Box, Grow, makeStyles } from "@material-ui/core";
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
    },
    padding: {
        height: "calc (100% - 8px)",
        margin: "8px 0px"
    },
    skeleton: {
        borderRadius: 4,
        height: "100%",
        width: "100%"
    }
});

const skeletonTimeout = { enter: 50, exit: 500 };
const contentTimeout = { enter: 500, exit: 100 };
const SkeletonWrapper = ({
    width,
    children,
    loading,
    variant,
    minHeight,
    CustomSkeleton,
    fill,
    array,
    Animation = Grow,
    ...skeletonProps
}) => {
    const classes = useStyles();

    return (
        <Box width={width || "100%"} className={classes.root} minHeight={minHeight}>
            <Animation in={loading} unmountOnExit timeout={skeletonTimeout}>
                <div className={classes.skeletonRoot}>
                    {CustomSkeleton || (
                        <Skeleton
                            animation="wave"
                            variant={variant || "rect"}
                            className={classes.skeleton}
                            {...skeletonProps}
                        />
                    )}
                </div>
            </Animation>
            <Animation in={!loading} timeout={contentTimeout}>
                <div>{(loading && fill && CustomSkeleton) || children}</div>
            </Animation>
        </Box>
    );
};

export default SkeletonWrapper;
