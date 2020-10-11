import React from "react";
import {
    DialogContent,
    Button,
    Typography,
    Grid,
    IconButton,
    Link,
    LinearProgress,
    Fade
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import {
    ACCOUNT_VIEW,
    handleEditAccountInfo,
    handleLoginAccount,
    handleSetAccountView
} from "./accountSlice";
import TextField from "common/TextField";
import ErrorDisplayer from "common/ErrorDisplayer";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = ({ handleClose, loading, errors }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.account.editAccountInfo);

    const handleUpdateState = dispatch(handleEditAccountInfo);

    const emailCheck = state.email && !state.email.match(emailRegex) && "Invalid email format";
    const passwordCheck =
        state.password && state.password.length < 6 && "Minimum 6 characters required";
    const confirmPasswordCheck =
        state.confirmPassword && state.confirmPassword !== state.password && "Password not match";

    const canSignUp =
        state.password &&
        state.email &&
        state.confirmPassword &&
        state.name &&
        !emailCheck &&
        !passwordCheck &&
        !confirmPasswordCheck;

    return (
        <Fade in>
            <DialogContent>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                    {!loading && (
                        <span className="floatRight">
                            <IconButton onClick={handleClose} size="small">
                                <CloseIcon />
                            </IconButton>
                        </span>
                    )}
                </Typography>
                <form>
                    <TextField
                        required
                        label="Name"
                        disabled={loading}
                        name="name"
                        value={state.name}
                        onChange={handleUpdateState}
                    />
                    <TextField
                        required
                        label="Email"
                        name="email"
                        error={emailCheck}
                        value={state.email}
                        disabled={loading}
                        helperText="example@mail.com"
                        onChange={handleUpdateState}
                    />
                    <TextField
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
                    <TextField
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
                <br />
            </DialogContent>
        </Fade>
    );
};

export default Register;
