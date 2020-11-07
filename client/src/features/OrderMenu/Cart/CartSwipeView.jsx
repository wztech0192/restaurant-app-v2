import { Button, Container, SwipeableDrawer } from "@material-ui/core";
import OrderSummary from "features/OrderSummary";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCart, setTip, setAdditionalRequest, handleAddOrRemoveItem } from "../slices/orderSlice";

const CartSwipeView = ({ menu }) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.order.openCart);
    const orderInfo = useSelector(state => state.order.cart);

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={e => dispatch(setOpenCart(false))}
            onOpen={e => dispatch(setOpenCart(true))}
        >
            <Container maxWidth="md">
                <OrderSummary
                    shouldUpdate={open}
                    orderInfo={orderInfo}
                    tax={menu.tax}
                    canEdit={true}
                    handleUpdateTip={e => {
                        dispatch(setTip(e.target.value));
                    }}
                    handleUpdateAdditionalRequest={e => {
                        dispatch(setAdditionalRequest(e.target.value));
                    }}
                    handleRemoveOrder={item => {
                        dispatch(handleAddOrRemoveItem(item.entryName, item, -item.quantity))();
                    }}
                    LeftBox={
                        <Button disabled={orderInfo.orderedItems.length <= 0} color="primary" variant="contained">
                            Make Payment
                        </Button>
                    }
                />
            </Container>
        </SwipeableDrawer>
    );
};

export default CartSwipeView;
