import { Fab } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCart } from "../slices/orderSlice";
import CartSwipeView from "./CartSwipeView";

const CartFloatButton = ({ classes, menu }) => {
    const total = useSelector(state => state.order.cart.total);
    const dispatch = useDispatch();
    return (
        <>
            <Fab
                variant="extended"
                color="primary"
                className={classes.cartButton}
                onClick={e => dispatch(setOpenCart(true))}
            >
                <ShoppingCart className={classes.extendedIcon} />
                &nbsp;&nbsp; ${total.toFixed(2)}
            </Fab>
            <CartSwipeView menu={menu} />
        </>
    );
};

export default CartFloatButton;
