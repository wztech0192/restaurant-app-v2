import { Fab, Fade, SwipeableDrawer } from "@material-ui/core";
import React from "react";
import useStyles from "./useStyles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MenuEntries from "./MenuEntries";

const OrderMenu = () => {
    const classes = useStyles();
    return (
        <Fade in>
            <div>
                <MenuEntries />
                <Fab
                    variant="extended"
                    color="primary"
                    className={classes.cartButton}
                    // onClick={e => actions.toggleOrderCart()}
                >
                    <ShoppingCart className={classes.extendedIcon} />
                    &nbsp;&nbsp; ${0.0 /*orderCart.total.toFixed(2)*/}
                </Fab>
                <SwipeableDrawer
                    anchor="bottom"
                    //open={orderCart.open}
                    // onClose={e => actions.toggleOrderCart()}
                    // onOpen={e => actions.toggleOrderCart()}
                >
                    <div>cart</div>
                    {/*<OrderCart
                    isConnected={isConnected}
                    orderCart={orderCart}
                    settings={settings}
                    openCart={orderCart.open}
                    classes={classes}
                    actions={actions}
                />*/}
                </SwipeableDrawer>
            </div>
        </Fade>
    );
};

export default OrderMenu;
