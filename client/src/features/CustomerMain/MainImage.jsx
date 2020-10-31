import React from "react";
import { makeStyles } from "@material-ui/core";
import mainFrameImage from "assets/mainFrame.png";

const useStyles = makeStyles({
    imgContainer: {
        marginTop: 10,
        minHeight: "30vh",
        textAlign: "center"
    },
    img: {
        width: "100%",
        maxWidth: 500,
        border: "1px solid black",
        margin: "0 auto",
        borderRadius: 24
    }
});

const MainImage = () => {
    const classes = useStyles();
    return (
        <div className={classes.imgContainer}>
            <img className={classes.img} src={mainFrameImage} />
        </div>
    );
};

export default MainImage;
