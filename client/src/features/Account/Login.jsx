import React from "react";
import { DialogContent, Button, Grid, Link, LinearProgress, Fade } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    ACCOUNT_VIEW,
    handleEditAccountInfo,
    handleEditAccountInfoPhone,
    handleLoginAccount,
    handleSetAccountView,
    editAccountInfo
} from "./accountSlice";
import TextFieldWrapper from "common/TextFieldWrapper";
import ErrorDisplayer from "common/ErrorDisplayer";
import AccountHeader from "./AccountHeader";
import { parseLocalStorageOrDefault } from "common";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const Login = ({ handleClose, loading, errors }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.account.editAccountInfo);

    React.useEffect(() => {
        const previousPhone = parseLocalStorageOrDefault("previousLoginPhone", "");
        if (previousPhone) {
            dispatch(
                editAccountInfo({
                    name: "phone",
                    value: previousPhone + ""
                })
            );
        }
    }, []);
    const handleUpdateState = dispatch(handleEditAccountInfo);

    return (
        <Fade in>
            <DialogContent>
                <AccountHeader loading={loading} handleClose={handleClose}>
                    Sign In
                </AccountHeader>
                <form>
                    <TextFieldWrapper
                        required
                        phoneMask
                        label="Phone"
                        disabled={loading}
                        name="phone"
                        value={state.phone}
                        onChange={dispatch(handleEditAccountInfoPhone)}
                        autoComplete="tel"
                    />
                    <TextFieldWrapper
                        required
                        label="Password"
                        name="password"
                        type="password"
                        value={state.password}
                        disabled={loading}
                        onChange={handleUpdateState}
                        autoComplete="current-password"
                    />
                    <ErrorDisplayer errors={errors} />

                    <br />
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item xs>
                            {!loading ? (
                                <Link
                                    color="textPrimary"
                                    onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.REGISTER))}
                                    className="pointer"
                                    variant="body2"
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            ) : (
                                <LinearProgress style={progessBarStyle} />
                            )}
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading || !state.phone || !state.password}
                                onClick={dispatch(handleLoginAccount(state, "login"))}
                            >
                                {loading ? "Processing..." : "Sign In"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Fade>
    );
};

export default Login;
