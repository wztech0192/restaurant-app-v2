import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Tooltip, makeStyles } from "@material-ui/core";
import AccountButton from "features/Account/AccountButton";
import { useSelector } from "react-redux";
import { checkIsOrderHubConnected } from "app/centralHub";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    toolbar: {
        minHeight: "56px !important"
    }
}));

const Header = ({ header }) => {
    const classes = useStyles();
    const isOrderHubConnected = useSelector(checkIsOrderHubConnected);

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                {!header.action ? (
                    <IconButton color="inherit" component={Link} to="/">
                        <HomeIcon />
                    </IconButton>
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
