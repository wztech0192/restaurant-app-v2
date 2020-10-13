import React from "react";
import { DialogContent, IconButton, Fade, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ProfileReadonly from "./ProfileReadonly";
import { useDispatch, useSelector } from "react-redux";
import { getAccountToken, handleGetAccountInfo, setEditAccountInfo } from "../accountSlice";
import { Skeleton } from "@material-ui/lab";
import AccountHeader from "../AccountHeader";
import ProfileEdit from "./ProfileEdit";

const Profile = ({ handleClose, loading, errors }) => {
    const accountInfo = useSelector(state => state.account.accountInfo);
    const token = useSelector(getAccountToken);
    const dispatch = useDispatch();
    const isAccountFetch = Boolean(accountInfo && token);

    React.useEffect(() => {
        if (token && !accountInfo) {
            dispatch(handleGetAccountInfo);
        }
    }, [accountInfo, token, dispatch]);

    const [isEdit, setEdit] = React.useState(false);

    const handleToggleEdit = state => e => {
        dispatch(setEditAccountInfo(state));
        setEdit(!isEdit);
    };

    const Content = isAccountFetch ? (
        !isEdit ? (
            <ProfileReadonly accountInfo={accountInfo} />
        ) : (
            <ProfileEdit
                errors={errors}
                handleToggleEdit={handleToggleEdit}
                loading={loading}
                accountInfo={accountInfo}
            />
        )
    ) : (
        <>
            <Skeleton height="56px" />
            <Skeleton height="56px" />
            <Skeleton height="56px" />
            <Skeleton height="56px" />
            <Skeleton height="56px" />
        </>
    );

    return (
        <Fade in>
            <DialogContent>
                <AccountHeader loading={loading} handleClose={handleClose}>
                    Profile{" "}
                    {isAccountFetch && !isEdit && (
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={handleToggleEdit(accountInfo)}
                                color="primary"
                                size="small"
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </AccountHeader>
                {Content}
            </DialogContent>
        </Fade>
    );
};

export default Profile;
