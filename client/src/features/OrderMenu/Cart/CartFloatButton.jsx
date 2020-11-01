import { Fab } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";

const CartFloatButton = ({ classes }) => {
    const total = useSelector(state => state.order.cart.total);
    return (
        <Fab
            variant="extended"
            color="primary"
            className={classes.cartButton}
            // onClick={e => actions.toggleOrderCart()}
        >
            <ShoppingCart className={classes.extendedIcon} />
            &nbsp;&nbsp; ${total.toFixed(2)}
        </Fab>
    );
};

export default CartFloatButton;
