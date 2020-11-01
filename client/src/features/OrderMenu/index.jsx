import { Fab, Fade, SwipeableDrawer } from "@material-ui/core";
import React from "react";
import useStyles from "./useStyles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MenuEntries from "./MenuEntry/MenuEntries";
import menu from "assets/menuSample";
import MenuSearch from "./MenuSearch";
import MenuSingleEntry from "./MenuEntry/MenuSingleEntry";
import { useSelector } from "react-redux";

console.log(menu);
const OrderMenu = ({ setTitle }) => {
    const classes = useStyles();
    const selectedEntryName = useSelector(state => state.order.selectedEntryName);
    React.useEffect(() => {
        setTitle(<MenuSearch classes={classes} />);
    }, [setTitle, classes]);

    const MenuView = selectedEntryName ? MenuSingleEntry : MenuEntries;

    return (
        <Fade in>
            <div className={classes.menuBody}>
                <MenuView menu={menu} selectedEntryName={selectedEntryName} />
                <Fab
                    variant="extended"
                    color="primary"
                    className={classes.cartButton}
                    // onClick={e => actions.toggleOrderCart()}
                >
                    <ShoppingCart className={classes.extendedIcon} />
                    &nbsp;&nbsp; ${0.0 /*orderCart.total.toFixed(2)*/}
                </Fab>
                {/*<SwipeableDrawer
                    anchor="bottom"
                    //open={orderCart.open}
                    // onClose={e => actions.toggleOrderCart()}
                    // onOpen={e => actions.toggleOrderCart()}
                >
                    <div>cart</div>
                    <OrderCart
                    isConnected={isConnected}
                    orderCart={orderCart}
                    settings={settings}
                    openCart={orderCart.open}
                    classes={classes}
                    actions={actions}
                />
                </SwipeableDrawer>*/}
            </div>
        </Fade>
    );
};

export default OrderMenu;
