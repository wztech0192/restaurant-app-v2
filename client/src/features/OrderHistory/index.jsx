import {
    Chip,
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
import { isAccountLogin } from "features/Account/accountSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchOrderHistory } from "./orderHistorySlice";
import { getDateStr } from "common";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        maxWidth: "580px"
    }
}));
const OrderHistory = () => {
    const classes = useStyles();
    const _orders = useSelector(state => state.orderHistory);

    const isLogin = useSelector(isAccountLogin);
    const loading = useSelector(getLoading("orderHistory"));

    const dispatch = useDispatch();

    const loginRef = React.useRef(isLogin);
    React.useEffect(() => {
        if (!_orders || loginRef.current !== isLogin) {
            loginRef.current = isLogin;
            dispatch(handleFetchOrderHistory(isLogin));
        }
    }, [_orders, dispatch, isLogin]);

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
                        <ListItem divider button key={i} onClick={() => {}}>
                            <ListItemText
                                primary={
                                    <span>
                                        <b>Ticket {order.id}</b>
                                    </span>
                                }
                                secondary={getDateStr(order.createdOn)}
                            />
                            <ListItemSecondaryAction>
                                <Chip color="primary" label="Today" size="small" />
                                &nbsp; &nbsp;&nbsp; ${order.price.toFixed(2)}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </SkeletonWrapper>
        </div>
    );
};

export default React.memo(OrderHistory);
