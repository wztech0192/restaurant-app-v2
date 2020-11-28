import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import TextFieldWrapper from "common/components/TextFieldWrapper";
import useSummaryStyles from "./useSummaryStyles";
import PriceSummaryBox from "./OrderSummaryBoxes/PriceSummaryBox";
import PersonSummaryBox from "./OrderSummaryBoxes/PersonSummaryBox";
import PaymentSummaryBox from "./OrderSummaryBoxes/PaymentSummaryBox";
import OrderSummaryHeader from "./OrderSummaryHeader";
import OrderItemsSummary from "./OrderItemsSummary";
import { getAccountRole } from "features/Account/accountSlice";
import { isManager } from "features/Account/roleChecker";
import { useSelector } from "react-redux";

const OrderSummary = ({
    orderInfo,
    canEdit,
    LeftBox,
    tax,
    handleUpdateTip,
    handleRemoveOrder,
    handleEditOrder,
    handleUpdateAdditionalRequest,
    unavailableItemSet
}) => {
    const classes = useSummaryStyles();
    const totalItems = orderInfo.orderedItems.length;
    console.log(orderInfo);
    const manager = isManager(useSelector(getAccountRole));
    return (
        <div>
            <OrderSummaryHeader orderInfo={orderInfo} classes={classes} totalItems={totalItems} />

            <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={12} md={7} className={classes.summaryItemsGrid}>
                    {totalItems === 0 ? (
                        <div>
                            <br />
                            <Typography>Empty Cart...</Typography>
                        </div>
                    ) : (
                        <OrderItemsSummary
                            unavailableItemSet={unavailableItemSet}
                            orderedItems={orderInfo.orderedItems}
                            canEdit={canEdit}
                            handleRemoveOrder={handleRemoveOrder}
                            handleEditOrder={handleEditOrder}
                            classes={classes}
                        />
                    )}
                    {unavailableItemSet && unavailableItemSet.size > 0 && (
                        <Typography color="error">
                            One or more items are currently unavailable! Please remove them to
                            continue.
                        </Typography>
                    )}
                    <TextFieldWrapper
                        solid
                        margin="dense"
                        variant="standard"
                        label={!canEdit && !orderInfo.additionalRequest ? "" : "Additional Request"}
                        disabled={!canEdit}
                        value={orderInfo.additionalRequest}
                        onChange={handleUpdateAdditionalRequest}
                    />
                </Grid>
                <Grid item xs={4} md={12} className={classes.summaryActionGrid}>
                    {LeftBox}
                </Grid>
                <Grid item xs={8} md={5}>
                    <Box display="flex" flexDirection="column" alignItems="flex-end" width="100%">
                        <PriceSummaryBox
                            classes={classes}
                            canEdit={canEdit}
                            handleUpdateTip={handleUpdateTip}
                            tip={orderInfo.tip}
                            tax={tax || orderInfo.tax}
                            subtotal={orderInfo.price}
                        />
                        {orderInfo.id && (
                            <>
                                <PersonSummaryBox classes={classes} orderInfo={orderInfo} />
                                {manager && orderInfo.encryptedCardInfo && (
                                    <PaymentSummaryBox
                                        classes={classes}
                                        encryptedCardInfo={orderInfo.encryptedCardInfo}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default React.memo(OrderSummary, (prev, next) => !next.shouldUpdate);
