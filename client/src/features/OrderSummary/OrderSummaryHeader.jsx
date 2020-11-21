import { Box, Chip, Divider, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { getDateStr } from "common";
import OrderStatus, { getStatusChipProps } from "features/OrderHistory/orderStatus";
import React from "react";

const OrderSummaryHeader = ({ orderInfo, totalItems, classes }) => {
    return (
        <div className={classes.header}>
            {orderInfo.id ? (
                <>
                    <Typography>
                        <b>Ticket {orderInfo.id}</b>
                        <br />
                        <Typography variant="caption">{getDateStr(orderInfo.createdOn)}</Typography>
                    </Typography>
                    <Box flexGrow="1" />
                    <Typography align="right">
                        {orderInfo.status !== OrderStatus.Expired && (
                            <Chip
                                component="span"
                                {...getStatusChipProps(orderInfo.status)}
                                label={OrderStatus.getDisplay(orderInfo.status)}
                                size="small"
                            />
                        )}
                        <br />
                        Total Items: {totalItems}
                    </Typography>
                </>
            ) : (
                <>
                    <ShoppingCart color="action" />
                    <Box flexGrow="1" />
                    <Typography>Total Items: {totalItems}</Typography>
                </>
            )}
        </div>
    );
};

export default OrderSummaryHeader;
