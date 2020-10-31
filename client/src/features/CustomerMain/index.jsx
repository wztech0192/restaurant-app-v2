import React from "react";
import { Typography, Button, Grid, Box, makeStyles, Grow } from "@material-ui/core";
import MapButton from "./MapButton";
import MainImage from "./MainImage";
import CheckIcon from "@material-ui/icons/CheckCircle";
import OrderIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Grow in>
            <div>
                <MapButton />
                <MainImage />
                <br />
                <Button
                    className="mainPageButton"
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
