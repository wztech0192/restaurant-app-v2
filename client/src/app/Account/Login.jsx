import React from "react";
import { DialogContent, Button, Grid, Link, LinearProgress, Fade } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    ACCOUNT_VIEW,
    handleEditAccountInfo,
    handleLoginAccount,
    handleSetAccountView
} from "./accountSlice";
import TextFieldWrapper from "common/TextFieldWrapper";
import ErrorDisplayer from "common/ErrorDisplayer";
import AccountHeader from "./AccountHeader";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const Login = ({ handleClose, loading, errors }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.account.editAccountInfo);

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
                        label="Email"
                        disabled={loading}
                        name="email"
                        value={state.email}
                        onChange={handleUpdateState}
                        autoComplete="email"
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
                                disabled={loading || !state.email || !state.password}
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
