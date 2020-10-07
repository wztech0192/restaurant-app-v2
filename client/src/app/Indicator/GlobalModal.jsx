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
    ({ title, variant = "info", content, buttons, message, messages, onConfirm, handleClose }) => {
        return (
            <>
                <DialogTitle>
                    <Typography variant="h6" color={"primary"}>
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {content}

                    {message && <Typography>{message}</Typography>}
                    {messages && messages.length > 0 && (
                        <ul>
                            {messages.map(msg => (
                                <li>
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
                        <Button onClick={onConfirm} color="primary">
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
    console.log(modal);
    const handleClose = dispatch(handleCloseModal);
    console.log(!!modal.open);
    return (
        <Dialog open={!!modal.open} onClose={handleClose}>
            <GlobalModalContent {...modal} handleClose={handleClose} />
        </Dialog>
    );
};
