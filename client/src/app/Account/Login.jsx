import React from "react";
import {
    DialogContent,
    Button,
    Typography,
    TextField,
    Grid,
    IconButton,
    Link,
    LinearProgress,
    Fade
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginAccount } from "./accountSlice";
import { getErrors, setErrors } from "app/Indicator/indicatorSlice";

const Login = ({ handleClose, loading }) => {
    const dispatch = useDispatch();
    const lastLoginEmail = useSelector(state => state.account.lastLoginEmail);

    const error = useSelector(getErrors("login"));

    const [state, setState] = React.useState({
        email: lastLoginEmail || "",
        password: ""
    });

    React.useEffect(() => {
        dispatch(setErrors({ errors: undefined, target: "login" }));
    }, [dispatch]);

    const handleUpdateState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Fade in>
            <DialogContent>
                <Typography variant="h5" gutterBottom>
                    Sign In
                    <span className="floatRight">
                        <IconButton disabled={loading} onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </span>
                </Typography>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    disabled={loading}
                    name="email"
                    value={state.email}
                    onChange={handleUpdateState}
                    autoComplete="email"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={state.password}
                    disabled={loading}
                    onChange={handleUpdateState}
                    autoComplete="current-password"
                />
                {error ? (
                    <Typography color="error">Invalid email or password, please retry!</Typography>
                ) : (
                    <br />
                )}

                <br />
                <Grid container alignContent="center" alignItems="center">
                    <Grid item xs>
                        {!loading ? (
                            <Link color="textPrimary" className="pointer" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        ) : (
                            <LinearProgress
                                style={{
                                    width: "90%",
                                    height: "10px",
                                    borderRadius: 50
                                }}
                            />
                        )}
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading || !state.email || !state.password}
                            onClick={dispatch(handleLoginAccount(state))}
                        >
                            {loading ? "Loading!" : "Sign In"}
                        </Button>
                    </Grid>
                </Grid>
                <br />
            </DialogContent>
        </Fade>
    );
};

export default Login;
