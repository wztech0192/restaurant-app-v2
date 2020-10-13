import React from "react";
import { Button, Grid, IconButton, LinearProgress, Switch, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { handleEditAccountInfo, handleUpdateAccount } from "../accountSlice";
import TextField from "common/TextField";
import ErrorDisplayer from "common/ErrorDisplayer";
import UndoIcon from "@material-ui/icons/Undo";
import { validEmailRegex } from "common";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const ProfileEdit = ({ loading, errors, handleToggleEdit }) => {
    const [changePassword, setChangePassword] = React.useState(false);
    const state = useSelector(state => state.account.editAccountInfo);
    const dispatch = useDispatch();
    const handleUpdateState = dispatch(handleEditAccountInfo);

    const emailCheck = state.email && !state.email.match(validEmailRegex) && "Invalid email format";
    const passwordCheck =
        state.newPassword && state.newPassword.length < 6 && "Minimum 6 characters required";
    const confirmPasswordCheck =
        state.confirmPassword &&
        state.confirmPassword !== state.newPassword &&
        "Password not match";

    const canSave =
        state.password &&
        state.email &&
        state.name &&
        !emailCheck &&
        (!changePassword ||
            (state.confirmPassword &&
                state.newPassword &&
                !passwordCheck &&
                !confirmPasswordCheck));

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
            <Switch
                disabled={loading}
                color="primary"
                value={changePassword}
                onChange={e => setChangePassword(e.target.checked)}
            />{" "}
            Change Password
            {changePassword && (
                <>
                    <TextField
                        required
                        label="New Password"
                        name="newPassword"
                        type="password"
                        error={passwordCheck}
                        value={state.newPassword}
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
                </>
            )}
            <hr />
            <TextField
                required
                label="Current Password"
                name="password"
                type="password"
                value={state.password}
                disabled={loading}
                onChange={handleUpdateState}
            />
            <ErrorDisplayer errors={errors} />
            <br />
            <Grid container alignContent="center" alignItems="center">
                <Grid item xs>
                    {loading ? (
                        <LinearProgress style={progessBarStyle} />
                    ) : (
                        <Tooltip title="Undo All" color="secondary" onClick={handleToggleEdit()}>
                            <IconButton>
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading || !canSave}
                        onClick={dispatch(handleUpdateAccount(changePassword))}
                    >
                        {loading ? "Processing..." : "Save"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProfileEdit;
