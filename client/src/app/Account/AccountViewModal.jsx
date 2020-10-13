import React from "react";
import { Box, Dialog } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_VIEW, handleLoadLocalAccount, handleSetAccountView } from "./accountSlice";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import { getErrors, getLoading, setErrors } from "app/Indicator/indicatorSlice";

const AccountViews = {
    [ACCOUNT_VIEW.LOGIN]: Login,
    [ACCOUNT_VIEW.REGISTER]: Register,
    [ACCOUNT_VIEW.PROFILE]: Profile
};

const AccountViewModalContent = React.memo(
    ({ handleClose, viewMode, loading, errors, dispatch }) => {
        React.useEffect(() => {
            //clear error
            dispatch(setErrors({ target: "account" }));
        }, [dispatch]);

        const View = AccountViews[viewMode];
        return <View handleClose={handleClose} loading={loading} errors={errors} />;
    },
    (prev, next) => !next.open
);

export default () => {
    const dispatch = useDispatch();
    const viewMode = useSelector(state => state.account.viewMode);
    const handleClose = dispatch(handleSetAccountView(ACCOUNT_VIEW.CLOSE));
    const open = viewMode !== ACCOUNT_VIEW.CLOSE;
    const loading = useSelector(getLoading("account"));
    const errors = useSelector(getErrors("account"));

    React.useEffect(() => {
        dispatch(handleLoadLocalAccount);
    }, [dispatch]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick={loading}
            maxWidth="xs"
            fullWidth
        >
            <Box paddingBottom="10px">
                <AccountViewModalContent
                    loading={loading}
                    open={open}
                    viewMode={viewMode}
                    errors={errors}
                    dispatch={dispatch}
                    handleClose={handleClose}
                />
            </Box>
        </Dialog>
    );
};
