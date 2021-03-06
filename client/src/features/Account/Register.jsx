import React from "react";
import { DialogContent, Button, Grid, Link, LinearProgress, Fade } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    ACCOUNT_VIEW,
    handleEditAccountInfo,
    handleEditAccountInfoPhone,
    handleLoginAccount,
    handleSetAccountView
} from "./accountSlice";
import TextFieldWrapper from "common/components/TextFieldWrapper";
import ErrorDisplayer from "common/components/ErrorDisplayer";
import AccountHeader from "./AccountHeader";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const Register = ({ handleClose, loading, errors }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.account.editAccountInfo);

    const handleUpdateState = dispatch(handleEditAccountInfo);

    const passwordCheck = state.password && state.password.length < 6 && "Minimum 6 characters required";
    const confirmPasswordCheck =
        state.confirmPassword && state.confirmPassword !== state.password && "Password not match";

    const canSignUp =
        state.password && state.confirmPassword && state.name && state.phone && !passwordCheck && !confirmPasswordCheck;

    return (
        <Fade in>
            <DialogContent>
                <AccountHeader loading={loading} handleClose={handleClose}>
                    Sign Up
                </AccountHeader>
                <form>
                    <TextFieldWrapper
                        required
                        label="Name"
                        disabled={loading}
                        name="name"
                        value={state.name}
                        onChange={handleUpdateState}
                    />

                    <TextFieldWrapper
                        required
                        label="Phone Number"
                        phoneMask
                        name="phone"
                        error={state.phone && state.phone.length !== 10}
                        value={state.phone}
                        disabled={loading}
                        onChange={dispatch(handleEditAccountInfoPhone)}
                    />
                    <TextFieldWrapper
                        required
                        label="Password"
                        name="password"
                        type="password"
                        error={passwordCheck}
                        value={state.password}
                        disabled={loading}
                        helperText="Minimum 6 characters "
                        onChange={handleUpdateState}
                    />
                    <TextFieldWrapper
                        required
                        label="Confirm Password"
                        name="confirmPassword"
                        error={confirmPasswordCheck}
                        type="password"
                        value={state.confirmPassword}
                        disabled={loading}
                        onChange={handleUpdateState}
                    />

                    <ErrorDisplayer errors={errors} />

                    <br />
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item xs>
                            {!loading ? (
                                <Link
                                    color="textPrimary"
                                    onClick={dispatch(handleSetAccountView(ACCOUNT_VIEW.LOGIN))}
                                    className="pointer"
                                    variant="body2"
                                >
                                    Already have an account? Sign In
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
                                disabled={loading || !canSignUp}
                                onClick={dispatch(handleLoginAccount(state, "register"))}
                            >
                                {loading ? "Processing..." : "Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Fade>
    );
};

export default Register;
