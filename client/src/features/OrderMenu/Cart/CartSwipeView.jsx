import { Box, Button, Container, SwipeableDrawer } from "@material-ui/core";
import OrderSummary from "features/OrderSummary";
import CreditCardForm from "features/CreditCard/CreditCardForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setOpenCart,
    setTip,
    setAdditionalRequest,
    handleAddOrRemoveItem,
    setEditedItem
} from "../slices/orderSlice";
import SubmitPaymentAction from "./SubmitPaymentAction";
import { checkIsOrderHubConnected } from "app/signalRHubs/centralHub";
import useBadStatus from "../useBadStatus";

const PaperProps = {
    style: {
        borderRadius: "12px 12px 0px 0px",
        maxHeight: "82vh"
    }
};
const CartSwipeView = ({ menu }) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.order.openCart);
    const orderInfo = useSelector(state => state.order.cart);
    const account = useSelector(state => state.account.accountInfo);

    const BadStatus = useBadStatus();

    const [openPayment, setOpenPayment] = React.useState(false);

    const handlers = React.useMemo(
        () => ({
            handleUpdateTip: e => {
                dispatch(setTip(e.target.value));
            },
            handleUpdateAdditionalRequest: e => {
                dispatch(setAdditionalRequest(e.target.value));
            },
            handleRemoveOrder: item => {
                dispatch(handleAddOrRemoveItem(item.entryName, item, -item.quantity))();
            },
            handleEditOrder: item => {
                dispatch(setEditedItem(item));
            }
        }),
        [dispatch]
    );
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={e => dispatch(setOpenCart(false))}
            onOpen={e => dispatch(setOpenCart(true))}
            PaperProps={PaperProps}
        >
            <Box component={Container} overflow="auto" maxWidth="md">
                <OrderSummary
                    shouldUpdate={open}
                    orderInfo={orderInfo}
                    tax={menu.tax}
                    canEdit={!openPayment}
                    {...handlers}
                    LeftBox={
                        openPayment ? (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={e => {
                                    setOpenPayment(false);
                                }}
                            >
                                Cancel Payment
                            </Button>
                        ) : (
                            <Button
                                disabled={orderInfo.orderedItems.length <= 0}
                                color="primary"
                                variant="contained"
                                onClick={e => {
                                    setOpenPayment(true);
                                }}
                            >
                                Make Payment
                            </Button>
                        )
                    }
                />
                {openPayment &&
                    (BadStatus || (
                        <CreditCardForm
                            account={account}
                            payWithExistingCard={true}
                            requiredPersonInfo
                            action={(isValid, paymentInfo) => (
                                <SubmitPaymentAction isValid={isValid} paymentInfo={paymentInfo} />
                            )}
                        />
                    ))}
            </Box>
        </SwipeableDrawer>
    );
};

export default CartSwipeView;
