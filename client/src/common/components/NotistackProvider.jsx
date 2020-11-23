import React from "react";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
};

const customClasses = {
    containerAnchorOriginBottomLeft: "snackbar"
};

const action = key => (
    <Button
        onClick={() => onClickDismiss(key)(key)}
        style={{
            height: "100%",
            left: 0,
            position: "absolute",
            width: "100%",
            top: 0
        }}
    />
);
const NotistackProvider = ({ children }) => {
    return (
        <SnackbarProvider preventDuplicate dense action={action} classes={customClasses} ref={notistackRef}>
            {children}
        </SnackbarProvider>
    );
};

export default NotistackProvider;
