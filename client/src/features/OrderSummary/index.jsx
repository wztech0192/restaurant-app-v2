import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import TextFieldWrapper from "common/TextFieldWrapper";
import useSummaryStyles from "./useSummaryStyles";
import OrderPriceSummaryBox from "./OrderPriceSummaryBox";
import OrderSummaryHeader from "./OrderSummaryHeader";
import OrderItemsSummary from "./OrderItemsSummary";
import { propCompare } from "common";

const OrderSummary = ({
    orderInfo,
    canEdit,
    LeftBox,
    tax,

    handleUpdateTip,
    handleRemoveOrder,
    handleEditOrder,
    handleUpdateAdditionalRequest
}) => {
    const classes = useSummaryStyles();
    const totalItems = orderInfo.orderedItems.length;
    console.log("test");
    return (
        <div>
            <OrderSummaryHeader classes={classes} totalItems={totalItems} />
            <div>
                {totalItems === 0 ? (
                    <div>
                        <br />
                        <Typography>Empty Cart...</Typography>
                    </div>
                ) : (
                    <OrderItemsSummary
                        orderedItems={orderInfo.orderedItems}
                        canEdit={canEdit}
                        handleRemoveOrder={handleRemoveOrder}
                        handleEditOrder={handleEditOrder}
                        classes={classes}
                    />
                )}
            </div>

            <TextFieldWrapper
                margin="dense"
                variant="standard"
                label="Additional Request"
                disabled={!canEdit}
                value={orderInfo.additionalRequest}
                onChange={handleUpdateAdditionalRequest}
            />

            <div className={classes.paymentActionBox}>
                {LeftBox}
                <Box flexGrow="1" />
                <OrderPriceSummaryBox
                    classes={classes}
                    canEdit={canEdit}
                    handleUpdateTip={handleUpdateTip}
                    tip={orderInfo.tip}
                    tax={tax || orderInfo.tax}
                    subtotal={orderInfo.total}
                />
            </div>
            <br />
        </div>
    );
};

export default React.memo(OrderSummary, (prev, next) => !next.shouldUpdate);
