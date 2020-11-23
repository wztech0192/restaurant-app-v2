import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Typography
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal } from "./indicatorSlice";

const GlobalModalContent = React.memo(
    ({
        title,
        titleColor = "primary",
        content,
        buttons,
        message,
        messages,
        onConfirm,
        handleClose
    }) => {
        return (
            <>
                <DialogTitle>
                    <Typography variant="h6" component="span" color={titleColor}>
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {content}

                    {message && <Typography>{message}</Typography>}
                    {messages && Array.isArray(messages) && messages.length > 0 && (
                        <ul>
                            {messages.map((msg, i) => (
                                <li key={i}>
                                    <Typography>{msg}</Typography>
                                </li>
                            ))}
                        </ul>
                    )}
                </DialogContent>
                <DialogActions>
                    {buttons ? (
                        buttons
                    ) : onConfirm ? (
                        <>
                            <Button
                                onClick={() => {
                                    handleClose();
                                    onConfirm();
                                }}
                                color="primary"
                            >
                                Confirm
                            </Button>
                            <Button onClick={handleClose} color="secondary">
                                Close
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleClose} color="primary">
                            Ok
                        </Button>
                    )}
                </DialogActions>
            </>
        );
    },
    (prev, next) => !next.open
);

export default () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.indicator.modal);
    const handleClose = dispatch(handleCloseModal);
    return (
        <Dialog open={!!modal.open} onClose={handleClose}>
            <GlobalModalContent {...modal} handleClose={handleClose} />
        </Dialog>
    );
};
