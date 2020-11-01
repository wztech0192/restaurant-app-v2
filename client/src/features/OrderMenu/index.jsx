import { Fab, Fade, Grid, IconButton, SwipeableDrawer, Zoom } from "@material-ui/core";
import React from "react";
import useStyles from "./useStyles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MenuEntries from "./MenuEntry/MenuEntries";
import MenuSearch from "./MenuSearch";
import MenuSingleEntry from "./MenuEntry/MenuSingleEntry";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import history from "app/history";
import { handleSelectEntryName } from "./orderSlice";
import { Link } from "react-router-dom";
import { handleFetchMenu } from "./menuSlice";
import { Skeleton } from "@material-ui/lab";

const LoadingSkeleton = () => (
    <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
            <Skeleton height={120} variant="rect" />
        </Grid>
        <Grid item md={6} xs={12}>
            <Skeleton height={100} variant="rect" />
        </Grid>
        <Grid item md={6} xs={12}>
            <Skeleton height={140} variant="rect" />
        </Grid>
        <Grid item md={6} xs={12}>
            <Skeleton height={120} variant="rect" />
        </Grid>
        <Grid item md={6} xs={12}>
            <Skeleton height={120} variant="rect" />
        </Grid>
        <Grid item md={6} xs={12}>
            <Skeleton height={120} variant="rect" />
        </Grid>
    </Grid>
);

const OrderMenu = ({ setHeader }) => {
    const classes = useStyles();
    const selectedEntryName = useSelector(state => state.order.selectedEntryName);

    const menu = useSelector(state => state.menu);
    const hasMenu = Boolean(menu);

    const dispatch = useDispatch();
    const isSelected = Boolean(selectedEntryName);

    React.useEffect(() => {
        setHeader({
            title: <MenuSearch classes={classes} />,
            action: isSelected ? (
                <IconButton color="inherit" onClick={dispatch(handleSelectEntryName(""))}>
                    <ArrowBackIcon />
                </IconButton>
            ) : (
                <IconButton color="inherit" component={Link} to="/">
                    <HomeIcon />
                </IconButton>
            )
        });
    }, [setHeader, classes, isSelected, dispatch]);

    React.useEffect(() => {
        if (!hasMenu) {
            dispatch(handleFetchMenu);
        }
    }, [hasMenu, dispatch]);

    const MenuView = selectedEntryName ? MenuSingleEntry : MenuEntries;

    return (
        <Fade in>
            <div className={classes.menuBody}>
                {hasMenu ? (
                    <MenuView menu={menu} selectedEntryName={selectedEntryName} />
                ) : (
                    <LoadingSkeleton />
                )}
                <Zoom in={hasMenu}>
                    <Fab
                        variant="extended"
                        color="primary"
                        className={classes.cartButton}
                        // onClick={e => actions.toggleOrderCart()}
                    >
                        <ShoppingCart className={classes.extendedIcon} />
                        &nbsp;&nbsp; ${0.0 /*orderCart.total.toFixed(2)*/}
                    </Fab>
                </Zoom>
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
