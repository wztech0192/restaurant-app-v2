import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Tooltip, makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import AccountButton from "app/Account/AccountButton";

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    }
}));

const phoneNum = "(803)226-0689";
const Header = () => {
    const classes = useStyles();

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
                <Typography variant="h6" className={classes.title}>
                    XXXX XXX
                </Typography>
                <AccountButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
