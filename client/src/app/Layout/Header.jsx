import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Tooltip, makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import AccountButton from "app/Account/AccountButton";
import { useSelector } from "react-redux";
import { checkIsOrderHubConnected } from "app/signalRHubs/ordersHub";
import CloudOffIcon from "@material-ui/icons/CloudOff";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    }
}));

const phoneNum = "(803)226-0689";
const Header = () => {
    const classes = useStyles();

    const isOrderHubConnected = useSelector(checkIsOrderHubConnected);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Tooltip title={`Call us at ${phoneNum}`}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        component="a"
                        href={`tel:+${phoneNum}`}
                    >
                        <PhoneIcon />
                    </IconButton>
                </Tooltip>

                <Typography variant="h6" className={classes.grow}>
                    Hibachi House
                </Typography>

                {!isOrderHubConnected && (
                    <Tooltip title="Not connected to the service, trying to reconnect">
                        <CloudOffIcon color="secondary" />
                    </Tooltip>
                )}

                <AccountButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
