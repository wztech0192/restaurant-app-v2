import { Box, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";

const OrderSummaryHeader = ({ totalItems, classes }) => {
    return (
        <div className={classes.header}>
            <ShoppingCart color="action" />
            <Box flexGrow="1" />
            <Typography>Total Items: {totalItems}</Typography>
        </div>
    );
};

export default OrderSummaryHeader;
