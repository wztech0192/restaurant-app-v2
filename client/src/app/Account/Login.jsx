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

const Login = ({ handleClose, loading, errors }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.account.editAccountInfo);

    const handleUpdateState = dispatch(handleEditAccountInfo);

    return (
        <Fade in>
            <DialogContent>
                <Typography variant="h5" gutterBottom>
                    Sign In
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
                        label="Email"
                        disabled={loading}
                        name="email"
                        value={state.email}
                        onChange={handleUpdateState}
                        autoComplete="email"
                    />
                    <TextField
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
                <br />
            </DialogContent>
        </Fade>
    );
};

export default Login;
