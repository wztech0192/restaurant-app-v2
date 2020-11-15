import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@material-ui/core";
import React from "react";
import CreditCardForm from "./CreditCardForm";

const AddCardModalContent = React.memo(
    ({ handleClose, handleAdd }) => {
        return (
            <>
                <DialogTitle>
                    <Typography variant="subtitl2" component="span">
                        Add New Card
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <CreditCardForm
                        action={(isValid, paymentInfo) => (
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={() => {
                                        handleClose();
                                        handleAdd(paymentInfo);
                                    }}
                                    disabled={!isValid}
                                    color="primary"
                                >
                                    Encrypt And Add
                                </Button>
                            </Box>
                        )}
                    />
                </DialogContent>
            </>
        );
    },
    (prev, next) => !next.open
);
const AddCardModal = ({ open, handleClose, handleAdd }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <AddCardModalContent open={open} handleAdd={handleAdd} handleClose={handleClose} />
        </Dialog>
    );
};

export default AddCardModal;
