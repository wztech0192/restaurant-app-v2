import { Button, makeStyles } from "@material-ui/core";
import { getLoading } from "app/Indicator/indicatorSlice";
import { EMPTY_ARRAY } from "common";
import { getAccountToken } from "features/Account/accountSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    handleFetchRecentOrderHistory,
    handleSyncOrderStatus,
    handleUnSyncOrderStatus
} from "./orderHistorySlice";
import { checkIsOrderHubConnected } from "app/centralHub";
import OrderSummaryModal from "features/OrderSummary/OrderSummaryModal";
import { handleSetOrderSummary } from "features/OrderSummary/orderSummarySlice";
import { handleBuyAgain } from "features/OrderMenu/slices/orderSlice";
import OrderHistoryList from "./OrderHistoryList";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        maxWidth: "580px"
    }
}));
const OrderHistory = () => {
    const classes = useStyles();
    const historyOrders = useSelector(state => state.orderHistory.orders);

    const isConnected = useSelector(checkIsOrderHubConnected);

    const hasToken = useSelector(getAccountToken);
    const loading = useSelector(getLoading("orderHistory"));

    const dispatch = useDispatch();
    const tokenRef = React.useRef(hasToken);
    React.useEffect(() => {
        if (!historyOrders || tokenRef.current !== hasToken) {
            tokenRef.current = hasToken;
            dispatch(handleFetchRecentOrderHistory);
        }
    }, [historyOrders, dispatch, hasToken]);

    React.useEffect(() => {
        if (isConnected) dispatch(handleSyncOrderStatus);
        else dispatch(handleUnSyncOrderStatus);
    }, [dispatch, isConnected]);

    const orders = historyOrders || EMPTY_ARRAY;
    return (
        <div className={classes.container}>
            <OrderHistoryList orders={orders} loading={loading} />
            <OrderSummaryModal>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={e => {
                        dispatch(handleBuyAgain);
                    }}
                >
                    Buy Again!
                </Button>
                <Button
                    onClick={() => {
                        dispatch(handleSetOrderSummary());
                    }}
                >
                    Close
                </Button>
            </OrderSummaryModal>
        </div>
    );
};

export default React.memo(OrderHistory);
