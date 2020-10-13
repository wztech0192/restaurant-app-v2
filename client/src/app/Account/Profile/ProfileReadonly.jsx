import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { handleLogout } from "../accountSlice";
import TextField from "common/TextField";
import { getDateStr } from "common";

const ProfileReadonly = ({ accountInfo }) => {
    const dispatch = useDispatch();

    return (
        <>
            <TextField label="Name" value={accountInfo.name} disabled solid />
            <TextField label="Email" value={accountInfo.email} disabled solid />
            <TextField
                label="Register Date"
                value={getDateStr(accountInfo.createdOn)}
                disabled
                solid
            />
            <br />
            <br />

            <Button type="submit" fullWidth variant="contained" onClick={dispatch(handleLogout)}>
                Sign Out
            </Button>
        </>
    );
};

export default ProfileReadonly;
