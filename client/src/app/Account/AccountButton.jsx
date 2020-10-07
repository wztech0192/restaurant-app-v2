import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { handleToggleLogin, getAccountToken } from "./accountSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { asyncAction } from "app/sharedActions";
import { postLogin } from "app/apiProvider";

const AccountButton = () => {
    const isLogin = useSelector(getAccountToken);

    const dispatch = useDispatch();

    React.useEffect(() => {}, [dispatch]);

    return isLogin ? (
        <>
            <IconButton color="inherit">
                <AccountIcon />
            </IconButton>
        </>
    ) : (
        <>
            <Button
                color="inherit"
                onClick={() => {
                    dispatch(
                        asyncAction({
                            promise: () =>
                                postLogin({
                                    email: "weijie0192@gmail.com",
                                    password: "weijie0191"
                                })
                        })
                    );
                    // handleToggleLogin();
                }}
            >
                Login
            </Button>
        </>
    );
};

export default React.memo(AccountButton);
