import React from "react";
import { Typography, Button, makeStyles, Grow } from "@material-ui/core";
import MapButton from "./MapButton";
import MainImage from "./MainImage";
import OrderIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";

const maxWidth = 600;
const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    makeOrderBtn: {
        borderRadius: "24px !important",
        height: 60,
        maxWidth: maxWidth
    },
    imgContainer: {
        marginTop: 10,
        minHeight: "30vh",
        textAlign: "center"
    },
    img: {
        width: "100%",
        maxWidth: maxWidth,
        border: "1px solid black",
        margin: "0 auto",
        borderRadius: 24
    },
    maxWidth: {
        maxWidth
    }
});

const Home = ({ setHeader }) => {
    React.useEffect(() => {
        setHeader({ title: "Hibachi House" });
    }, [setHeader]);

    const classes = useStyles();
    return (
        <Grow in>
            <div className={classes.container}>
                <MapButton classes={classes} />
                <MainImage classes={classes} />
                <br />
                <Button
                    className={classes.makeOrderBtn}
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to="/order"
                >
                    <Typography variant="h6">
                        <OrderIcon className="sub" /> Make Order
                    </Typography>
                </Button>
            </div>
        </Grow>
    );
};

export default Home;
