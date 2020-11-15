import {
    Chip,
    Grow,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { getLoading } from "app/Indicator/indicatorSlice";
import { EMPTY_ARRAY } from "common";
import SkeletonWrapper from "common/SkeletonWrapper";
import { getAccountToken } from "features/Account/accountSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchOrderHistory } from "./orderHistorySlice";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        maxWidth: "580px"
    }
}));
const OrderHistory = () => {
    const classes = useStyles();
    const _orders = useSelector(state => state.orderHistory);

    const accountToken = useSelector(getAccountToken);
    const loading = useSelector(getLoading("orderHistory"));

    const dispatch = useDispatch();

    const tokenRef = React.useRef(accountToken);
    React.useEffect(() => {
        if (!_orders || tokenRef.current !== accountToken) {
            tokenRef.current = accountToken;
            dispatch(handleFetchOrderHistory(accountToken));
        }
    }, [_orders, dispatch, accountToken]);

    const orders = _orders || EMPTY_ARRAY;
    return (
        <div className={classes.container}>
            <SkeletonWrapper
                loading={loading}
                CustomSkelton={
                    <div>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                }
            >
                <List dense>
                    {orders.map((order, i) => (
                        <ListItem button key={i} onClick={() => {}}>
                            <ListItemText
                                primary={`Ticket #${order.ticketID}`}
                                secondary={order.orderDate}
                            />
                            <ListItemSecondaryAction>
                                <Chip color="primary" label="Today" size="small" />$
                                {order.price.toFixed(2)}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </SkeletonWrapper>
        </div>
    );
};

export default React.memo(OrderHistory);
