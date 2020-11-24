import { Box, Chip, Fade, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import React from "react";
import { getDateStr } from "common";
import OrderStatus, { getOrderStatusDisplay, getStatusChipProps } from "./orderStatus";
import { handleSetOrderSummary } from "features/OrderSummary/orderSummarySlice";
import { useDispatch } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import SkeletonWrapper from "common/components/SkeletonWrapper";

const LoadingSkeleton = () => (
    <List dense>
        {Array(5)
            .fill()
            .map((_, i) => (
                <ListItem divider key={i}>
                    <ListItemText primary={<Skeleton width="80px" />} secondary={<Skeleton width="130px" />} />
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

    return (
        <SkeletonWrapper Animation={Fade} fill loading={loading} CustomSkeleton={<LoadingSkeleton />}>
            <List dense>
                {orders.length <= 0
                    ? emptyLabel
                    : orders.map((order, i) => (
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
        </SkeletonWrapper>
    );
};

export default OrderHistoryList;
