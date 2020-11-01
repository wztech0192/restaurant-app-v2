import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Tooltip, makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import AccountButton from "app/Account/AccountButton";
import { useSelector } from "react-redux";
import { checkIsOrderHubConnected } from "app/signalRHubs/ordersHub";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    }
}));

const phoneNum = "(803)226-0689";
const Header = ({ title }) => {
    const classes = useStyles();
    const location = useLocation();
    const isOrderHubConnected = useSelector(checkIsOrderHubConnected);
    const isHome = location.pathname === "/";

    return (
        <AppBar position="fixed">
            <Toolbar>
                {isHome ? (
                    <Tooltip title={`Call us at ${phoneNum}`}>
                        <IconButton edge="start" color="inherit" component="a" href={`tel:+${phoneNum}`}>
                            <PhoneIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <IconButton component={Link} to="/" edge="start" color="inherit">
                        <HomeIcon />
                    </IconButton>
                )}

                <Typography variant="h6" component="div" className={classes.grow}>
                    {title}
                </Typography>

                {!isOrderHubConnected && (
                    <Tooltip title="Not connected to the service, trying to reconnect">
                        <IconButton color="secondary">
                            <CloudOffIcon />
                        </IconButton>
                    </Tooltip>
                )}

                <AccountButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
