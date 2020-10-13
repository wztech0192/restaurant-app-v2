import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const AccountHeader = ({ children, handleClose, loading }) => {
    return (
        <Typography variant="h5">
            {children}
            {!loading && (
                <span className="floatRight">
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </span>
            )}
        </Typography>
    );
};

export default AccountHeader;
