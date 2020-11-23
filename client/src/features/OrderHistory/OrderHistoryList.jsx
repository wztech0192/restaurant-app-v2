import {
    Box,
    Chip,
    Grow,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import React from "react";
import { getDateStr } from "common";
import OrderStatus, { getOrderStatusDisplay, getStatusChipProps } from "./orderStatus";
import { handleSetOrderSummary } from "features/OrderSummary/orderSummarySlice";
import { useDispatch } from "react-redux";
import { Skeleton } from "@material-ui/lab";

const OrderHistoryList = ({ loading, orders, emptyLabel }) => {
    const dispatch = useDispatch();

    if (loading) {
        return Array(4)
            .fill()
            .map((_, i) => (
                <Skeleton
                    component={Box}
                    variant="rect"
                    marginBottom="5px"
                    key={i}
                    height="61px"
                    animation="wave"
                />
            ));
    }

    return (
        <Grow in>
            <List dense>
                {orders.map((order, i) => (
                    <ListItem
                        divider
                        button
                        key={i}
                        onClick={() => {
                            dispatch(handleSetOrderSummary(order));
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
                                    label={getOrderStatusDisplay(order.status)}
                                    size="small"
                                />
                            )}
                            &nbsp; &nbsp;&nbsp; ${order.price.toFixed(2)}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Grow>
    );
};

export default OrderHistoryList;
