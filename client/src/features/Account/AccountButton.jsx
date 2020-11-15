import React from "react";
import { Button, IconButton, Typography } from "@material-ui/core";
import {
    handleSetAccountView,
    getAccountToken,
    ACCOUNT_VIEW,
    getAccountRole
} from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { isManager } from "./roleChecker";

const AccountButton = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(getAccountToken);
    const role = useSelector(getAccountRole);
    const manager = isManager(role);

    return isLogin ? (
        <>
            {manager && <Typography>Manager</Typography>}
            <IconButton
                color="inherit"
                onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.PROFILE))}
            >
                <AccountIcon />
            </IconButton>
        </>
    ) : (
        <Button color="inherit" onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.LOGIN))}>
            Sign In
        </Button>
    );
};

export default React.memo(AccountButton);
