import React from "react";
import { Dialog } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_VIEW, handleSetAccountView } from "./accountSlice";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import { getLoading } from "app/Indicator/indicatorSlice";

const AccountViews = {
    [ACCOUNT_VIEW.LOGIN]: Login,
    [ACCOUNT_VIEW.REGISTER]: Register,
    [ACCOUNT_VIEW.PROFILE]: Profile
};

const AccountViewModalContent = React.memo(
    ({ handleClose, viewMode, loading }) => {
        const View = AccountViews[viewMode];
        return <View handleClose={handleClose} loading={loading} />;
    },
    (prev, next) => !next.open
);

export default () => {
    const dispatch = useDispatch();
    const viewMode = useSelector(state => state.account.viewMode);
    const handleClose = dispatch(handleSetAccountView(ACCOUNT_VIEW.CLOSE));
    const open = viewMode !== ACCOUNT_VIEW.CLOSE;
    const loading = useSelector(getLoading("accountViewModal"));

    return (
        <Dialog open={open} onClose={handleClose} disableBackdropClick={loading}>
            <AccountViewModalContent
                loading={loading}
                open={open}
                viewMode={viewMode}
                handleClose={handleClose}
            />
        </Dialog>
    );
};
