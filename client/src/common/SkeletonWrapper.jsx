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
    skeleton: {
        width: "100%",
        height: "100%"
    }
});

const skeletonTimeout = { enter: 50, exit: 500 };
const contentTimeout = { enter: 500, exit: 50 };
const SkeletonWrapper = ({
    children,
    loading,
    variant,
    minHeight,
    CustomSkelton,
    ...skeletonProps
}) => {
    const classes = useStyles();
    return (
        <Box className={classes.root} minHeight={minHeight}>
            <Grow in={loading} unmountOnExit timeout={skeletonTimeout}>
                <div className={classes.skeletonRoot}>
                    {CustomSkelton || (
                        <Skeleton
                            animation="wave"
                            variant={variant || "rect"}
                            className={classes.skeleton}
                            {...skeletonProps}
                        />
                    )}
                </div>
            </Grow>
            <Grow in={!loading} timeout={contentTimeout}>
                <div>{children}</div>
            </Grow>
        </Box>
    );
};

export default SkeletonWrapper;
