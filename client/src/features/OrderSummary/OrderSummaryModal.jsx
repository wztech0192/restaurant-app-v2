import { Dialog, DialogContent, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from ".";
import { handleSetOrderSummary } from "./orderSummarySlice";

const useStyles = makeStyles(theme => ({
    action: {
        [theme.breakpoints.up("md")]: {
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
    ({ handleClose, selectedOrder, children }) => {
        const classes = useStyles();
        return (
            <DialogContent className={classes.content}>
                <OrderSummary
                    shouldUpdate
                    orderInfo={selectedOrder}
                    LeftBox={
                        <Grid
                            container
                            justify="space-between"
                            alignItems="stretch"
                            className={classes.action}
                        >
                            {React.Children.map(children, child => (
                                <Grid item xs={12} md="auto">
                                    {child}
                                </Grid>
                            ))}
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
        dispatch(handleSetOrderSummary());
    };
    return (
        <Dialog open={Boolean(selectedOrder)} onClose={handleClose} maxWidth="sm" fullWidth>
            <OrderSummaryModalContent
                selectedOrder={selectedOrder}
                handleClose={handleClose}
                {...props}
            />
        </Dialog>
    );
};

export default OrderSummaryModal;
