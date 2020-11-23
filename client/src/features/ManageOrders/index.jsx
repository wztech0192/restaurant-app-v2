import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { getLoading } from "app/Indicator/indicatorSlice";
import { EMPTY_ARRAY } from "common";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleQueryOrder } from "../OrderHistory/orderHistorySlice";
import { checkIsOrderHubConnected } from "app/centralHub";
import OrderSummaryModal from "features/OrderSummary/OrderSummaryModal";
import { handleUpdateOrderStatus, handleSetOrderSummary } from "features/OrderSummary/orderSummarySlice";
import OrderHistoryFilter from "../OrderHistory/OrderHistoryFilter";
import OrderHistoryList from "../OrderHistory/OrderHistoryList";
import OrderStatus from "features/OrderHistory/orderStatus";
import encryptionProvider from "common/encryptionProvider";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        padding: 10
    }
}));

const ManageOrders = ({ match, setHeader }) => {
    const classes = useStyles();
    const orders = useSelector(state => state.orderHistory.orders) || EMPTY_ARRAY;
    const isConnected = useSelector(checkIsOrderHubConnected);
    const selectedOrder = useSelector(state => state.orderSummary.selectedOrder);
    const loading = useSelector(getLoading("orderHistory"));
    const dispatch = useDispatch();
    const filter = useSelector(state => state.orderHistory.filter);

    React.useEffect(() => {
        setHeader({
            title: "Manage Orders"
        });
    }, [setHeader]);

    React.useEffect(() => {
        encryptionProvider.setPrivateKey(match.params.key);
    }, [match]);

    React.useEffect(() => {
        if (isConnected) dispatch(handleQueryOrder(filter));
    }, [dispatch, isConnected, filter]);

    return (
        <div className={classes.container}>
            <OrderHistoryFilter />
            <br />
            <Paper component={Box}>
                {orders.length > 0 ? (
                    <OrderHistoryList orders={orders} loading={loading} />
                ) : (
                    <Typography>&nbsp;&nbsp;&nbsp;Empty...</Typography>
                )}
            </Paper>

            <OrderSummaryModal>
                {selectedOrder && selectedOrder.status === OrderStatus.Pending ? (
                    [
                        <Button
                            key="accept"
                            color="primary"
                            variant="contained"
                            onClick={dispatch(handleUpdateOrderStatus(selectedOrder.id, OrderStatus.Accepted))}
                        >
                            Accept
                        </Button>,
                        <Button
                            key="reject"
                            color="secondary"
                            onClick={dispatch(handleUpdateOrderStatus(selectedOrder.id, OrderStatus.Rejected))}
                        >
                            Reject
                        </Button>
                    ]
                ) : (
                    <Button
                        onClick={() => {
                            dispatch(handleSetOrderSummary());
                        }}
                    >
                        Close
                    </Button>
                )}
            </OrderSummaryModal>
        </div>
    );
};

export default React.memo(ManageOrders);
