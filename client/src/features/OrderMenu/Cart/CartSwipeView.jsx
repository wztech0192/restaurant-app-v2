import { Box, Button, Container, SwipeableDrawer } from "@material-ui/core";
import OrderSummary from "features/OrderSummary";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCart, setTip, setAdditionalRequest, handleAddOrRemoveItem, setEditedItem } from "../slices/orderSlice";
import CartPayment from "./CartPayment";
import useBadStatus from "../useBadStatus";
import { validateRule } from "features/ManageOrderRules/ruleValidator";

const PaperProps = {
    style: {
        borderRadius: "12px 12px 0px 0px",
        maxHeight: "82vh"
    }
};
const CartSwipeView = ({ menu, orderRules }) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.order.openCart);
    const orderInfo = useSelector(state => state.order.cart);

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

    const unavailableItemSet = React.useMemo(() => {
        const set = new Set();
        for (let item of orderInfo.orderedItems) {
            if (!validateRule(orderRules, item.entryName) || !validateRule(orderRules, item.name)) {
                set.add(item.name);
            }
        }
        return set;
    }, [orderRules, orderInfo.orderedItems]);

    return (
        <SwipeableDrawer
            disableDiscovery
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
                    orderRules={orderRules}
                    unavailableItemSet={unavailableItemSet}
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
                                disabled={
                                    orderInfo.orderedItems.length <= 0 ||
                                    unavailableItemSet.size > 0 ||
                                    Boolean(BadStatus)
                                }
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
                {BadStatus || (openPayment && <CartPayment />)}
                <br />
            </Box>
        </SwipeableDrawer>
    );
};

export default CartSwipeView;
