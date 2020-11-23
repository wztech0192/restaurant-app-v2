import React from "react";
import mainFrameImage from "assets/mainFrame.png";

const MainImage = ({ classes }) => {
    return (
        <div className={classes.imgContainer}>
            <img className={classes.img} src={mainFrameImage} alt="Restaurant Frame" />
        </div>
    );
};

export default MainImage;
