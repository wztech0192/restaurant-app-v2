import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { handleLogout } from "../accountSlice";
import TextFieldWrapper from "common/TextFieldWrapper";
import { getDateStr } from "common";

const ProfileReadonly = ({ accountInfo }) => {
    const dispatch = useDispatch();

    return (
        <>
            <TextFieldWrapper label="Name" value={accountInfo.name} disabled solid />
            <TextFieldWrapper label="Email" value={accountInfo.email} disabled solid />
            <TextFieldWrapper
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
