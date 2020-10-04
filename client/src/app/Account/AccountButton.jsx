import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { handleToggleLogin, getAccountToken } from "./accountSlice";
import { useSelector } from "react-redux";
import AccountIcon from "@material-ui/icons/AccountCircle";

const AccountButton = () => {
    const isLogin = useSelector(getAccountToken);

    return !isLogin ? (
        <>
            <IconButton color="inherit">
                <AccountIcon />
            </IconButton>
        </>
    ) : (
        <>
            <Button color="inherit" onClick={handleToggleLogin()}>
                Login
            </Button>
        </>
    );
};

export default React.memo(AccountButton);
