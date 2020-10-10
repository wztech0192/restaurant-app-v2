import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { handleSetAccountView, getAccountToken, ACCOUNT_VIEW } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountIcon from "@material-ui/icons/AccountCircle";

const AccountButton = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(getAccountToken);

    return isLogin ? (
        <IconButton color="inherit" onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.PROFILE))}>
            <AccountIcon />
        </IconButton>
    ) : (
        <Button color="inherit" onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.LOGIN))}>
            Sign In
        </Button>
    );
};

export default React.memo(AccountButton);
