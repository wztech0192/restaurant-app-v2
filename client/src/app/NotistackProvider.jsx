import React from "react";
import { SnackbarProvider } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
};

const customAction = key => (
    <IconButton color="inherit" onClick={onClickDismiss(key)}>
        <CloseIcon color="inherit" />
    </IconButton>
);

const customClasses = {
    containerAnchorOriginBottomLeft: "snackbar"
};

const NotistackProvider = ({ children }) => {
    return (
        <SnackbarProvider classes={customClasses} ref={notistackRef} action={customAction}>
            {children}
        </SnackbarProvider>
    );
};

export default NotistackProvider;
