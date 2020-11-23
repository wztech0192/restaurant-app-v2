import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import TextFieldWrapper from "common/components/TextFieldWrapper";
import useSummaryStyles from "./useSummaryStyles";
import PriceSummaryBox from "./OrderSummaryBoxes/PriceSummaryBox";
import PersonSummaryBox from "./OrderSummaryBoxes/PersonSummaryBox";
import OrderSummaryHeader from "./OrderSummaryHeader";
import OrderItemsSummary from "./OrderItemsSummary";

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
    return (
        <div>
            <OrderSummaryHeader orderInfo={orderInfo} classes={classes} totalItems={totalItems} />

            <Grid container spacing={1} alignItems="center">
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
                            One or more items are currently unavailable! Please remove them to continue.
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
                    <Box display="flex" justifyContent="flex-end">
                        <PriceSummaryBox
                            classes={classes}
                            canEdit={canEdit}
                            handleUpdateTip={handleUpdateTip}
                            tip={orderInfo.tip}
                            tax={tax || orderInfo.tax}
                            subtotal={orderInfo.price}
                        />
                    </Box>
                    {orderInfo.id && (
                        <>
                            <br />
                            <PersonSummaryBox
                                classes={classes}
                                orderInfo={orderInfo}
                                canEdit={canEdit}
                                handleUpdateTip={handleUpdateTip}
                                tip={orderInfo.tip}
                                tax={tax || orderInfo.tax}
                                subtotal={orderInfo.price}
                            />
                        </>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default React.memo(OrderSummary, (prev, next) => !next.shouldUpdate);
