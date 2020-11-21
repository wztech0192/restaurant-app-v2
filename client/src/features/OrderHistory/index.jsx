import { Chip, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { getLoading } from "app/Indicator/indicatorSlice";
import { EMPTY_ARRAY } from "common";
import SkeletonWrapper from "common/SkeletonWrapper";
import { getAccountToken } from "features/Account/accountSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchOrderHistory, handleSyncOrderStatus, handleUnSyncOrderStatus } from "./orderHistorySlice";
import { getDateStr } from "common";
import { checkIsOrderHubConnected } from "app/centralHub";
import OrderStatus, { getStatusChipProps } from "./orderStatus";
import OrderSummaryModal from "features/OrderSummary/OrderSummaryModal";
import { setOrderSummary } from "features/OrderSummary/orderSummarySlice";

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
            dispatch(handleFetchOrderHistory);
        }
    }, [historyOrders, dispatch, hasToken]);

    React.useEffect(() => {
        if (isConnected) dispatch(handleSyncOrderStatus);
        else dispatch(handleUnSyncOrderStatus);
    }, [dispatch, isConnected]);

    const orders = historyOrders || EMPTY_ARRAY;
    return (
        <div className={classes.container}>
            <SkeletonWrapper
                loading={loading}
                CustomSkelton={Array(4)
                    .fill()
                    .map((_, i) => (
                        <Skeleton key={i} height="61px" animation="wave" />
                    ))}
            >
                <List dense>
                    {orders.map((order, i) => (
                        <ListItem
                            divider
                            button
                            key={i}
                            onClick={() => {
                                dispatch(setOrderSummary(order));
                            }}
                        >
                            <ListItemText
                                primary={
                                    <span>
                                        <b>Ticket {order.id}</b>
                                    </span>
                                }
                                secondary={getDateStr(order.createdOn)}
                            />
                            <ListItemSecondaryAction>
                                {order.status !== OrderStatus.Expired && (
                                    <Chip
                                        {...getStatusChipProps(order.status)}
                                        label={OrderStatus.getDisplay(order.status)}
                                        size="small"
                                    />
                                )}
                                &nbsp; &nbsp;&nbsp; ${order.price.toFixed(2)}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </SkeletonWrapper>
            <OrderSummaryModal />
        </div>
    );
};

export default React.memo(OrderHistory);
