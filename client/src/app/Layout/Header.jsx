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
    },
    toolbar: {
        minHeight: "56px !important"
    }
}));

const phoneNum = "(803)226-0689";
const Header = ({ header }) => {
    const classes = useStyles();
    const isOrderHubConnected = useSelector(checkIsOrderHubConnected);

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                {!header.action ? (
                    <Tooltip title={`Call us at ${phoneNum}`}>
                        <IconButton edge="start" color="inherit" component="a" href={`tel:+${phoneNum}`}>
                            <PhoneIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    header.action
                )}

                <Typography variant="h6" component="div" className={classes.grow}>
                    {header.title}
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
