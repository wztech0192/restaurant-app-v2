import {
    Box,
    Chip,
    Fade,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import React from "react";
import { calcTotal, getDateStr, validateOrderFilter } from "common";
import OrderStatus, { getOrderStatusDisplay, getStatusChipProps } from "./orderStatus";
import { handleSetOrderSummary } from "features/OrderSummary/orderSummarySlice";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import SkeletonWrapper from "common/components/SkeletonWrapper";

const LoadingSkeleton = () => (
    <List dense>
        {Array(5)
            .fill()
            .map((_, i) => (
                <ListItem divider key={i}>
                    <ListItemText
                        primary={<Skeleton width="80px" />}
                        secondary={<Skeleton width="130px" />}
                    />
                    <ListItemSecondaryAction>
                        <Box display="inline-flex">
                            <Skeleton display="inline-flex" height="35px" width="65px" />
                        </Box>
                        &nbsp; &nbsp;&nbsp;
                        <Box display="inline-flex">
                            <Skeleton width="50px" display="inline-flex" height="35px" />
                        </Box>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
    </List>
);
const OrderHistoryList = ({ loading, orders, emptyLabel = null }) => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.orderHistory.filter);

    return (
        <SkeletonWrapper
            Animation={Fade}
            fill
            loading={loading}
            CustomSkeleton={<LoadingSkeleton />}
        >
            <List dense>
                {orders.length <= 0
                    ? emptyLabel
                    : orders.reduce((acc, order, i) => {
                          if (validateOrderFilter(filter, order))
                              acc.push(
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
                                              <Typography variant={i === 0 ? "h6" : undefined}>
                                                  <b>Ticket {order.id}</b>
                                              </Typography>
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
                                          &nbsp; &nbsp;&nbsp; ${calcTotal(order).toFixed(2)}
                                      </ListItemSecondaryAction>
                                  </ListItem>
                              );
                          return acc;
                      }, [])}
            </List>
        </SkeletonWrapper>
    );
};

export default OrderHistoryList;
