import React from "react";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import { handleSetAccountView, getAccountToken, ACCOUNT_VIEW, getAccountRole } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { isManager } from "./roleChecker";
import packageJson from "../../../package.json";
const AccountButton = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(getAccountToken);
    const role = useSelector(getAccountRole);
    const manager = isManager(role);

    return isLogin ? (
        <>
            {manager && <Typography>Manager</Typography>}
            <Tooltip title={`App Version ${packageJson.version}`}>
                <IconButton color="inherit" onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.PROFILE))}>
                    <AccountIcon />
                </IconButton>
            </Tooltip>
        </>
    ) : (
        <Button color="inherit" onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.LOGIN))}>
            Sign In
        </Button>
    );
};

export default React.memo(AccountButton);
