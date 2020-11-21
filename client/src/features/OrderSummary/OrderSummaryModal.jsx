import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from ".";
import { setOrderSummary } from "./orderSummarySlice";

const useStyles = makeStyles(theme => ({
    action: {
        [theme.breakpoints.up("sm")]: {
            flexDirection: "row-reverse"
        }
    },
    content: {
        padding: 10,
        paddingTop: "0 !important",
        overflowX: "hidden"
    }
}));
const OrderSummaryModalContent = React.memo(
    ({ handleClose, selectedOrder }) => {
        const classes = useStyles();
        return (
            <DialogContent className={classes.content}>
                <OrderSummary
                    shouldUpdate
                    orderInfo={selectedOrder}
                    LeftBox={
                        <Grid container justify="space-between" alignItems="stretch" className={classes.action}>
                            <Grid item xs={12} sm="auto">
                                <Button color="primary" variant="contained" onClick={e => {}}>
                                    Buy Again!
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <Button onClick={handleClose}>Close</Button>
                            </Grid>
                        </Grid>
                    }
                />
            </DialogContent>
        );
    },
    (prev, next) => !next.selectedOrder
);
const OrderSummaryModal = props => {
    const selectedOrder = useSelector(state => state.orderSummary.selectedOrder);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setOrderSummary());
    };
    return (
        <Dialog open={Boolean(selectedOrder)} onClose={handleClose} maxWidth="md">
            <OrderSummaryModalContent selectedOrder={selectedOrder} handleClose={handleClose} {...props} />
        </Dialog>
    );
};

export default OrderSummaryModal;
