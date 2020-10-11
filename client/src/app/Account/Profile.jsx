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
    handleSetAccountView,
    handleGetAccountInfo
} from "./accountSlice";
import TextField from "common/TextField";
import ErrorDisplayer from "common/ErrorDisplayer";
import { getDateStr, validEmailRegex } from "common";
import { Skeleton } from "@material-ui/lab";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const ProfileEditMode = ({ loading, errors }) => {
    const state = useSelector(state => state.account.editAccountInfo);
    const dispatch = useDispatch();
    const handleUpdateState = dispatch(handleEditAccountInfo);

    const emailCheck = state.email && !state.email.match(validEmailRegex) && "Invalid email format";
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
                    {loading && <LinearProgress style={progessBarStyle} />}
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
    );
};

const ProfileReadonlyMode = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.account.accountInfo);

    React.useEffect(() => {
        if (!state) {
            dispatch(handleGetAccountInfo);
        }
    }, [state, dispatch]);

    const View = state ? (
        <>
            <TextField label="Role" value={state.role} disabled solid />
            <TextField label="Name" value={state.name} disabled solid />
            <TextField label="Email" value={state.email} disabled solid />
            <TextField label="Register Date" value={getDateStr(state.createdOn)} disabled solid />
        </>
    ) : (
        <>
            <Skeleton height="56px" />
            <Skeleton height="56px" />
            <Skeleton height="56px" />
            <Skeleton height="56px" />
        </>
    );

    return (
        <>
            {View}
            <br />
            <br />
            <Grid container alignContent="center" alignItems="center">
                <Grid item xs></Grid>
                <Grid item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={dispatch(handleLoginAccount(state, "register"))}
                    >
                        Sign Out
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

const Profile = ({ handleClose, loading, errors }) => {
    return (
        <Fade in>
            <DialogContent>
                <Typography variant="h5" gutterBottom>
                    Profile
                    {!loading && (
                        <span className="floatRight">
                            <IconButton onClick={handleClose} size="small">
                                <CloseIcon />
                            </IconButton>
                        </span>
                    )}
                </Typography>

                <ProfileReadonlyMode />
                <br />
            </DialogContent>
        </Fade>
    );
};

export default Profile;
