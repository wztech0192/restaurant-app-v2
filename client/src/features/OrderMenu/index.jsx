import { Fade, Grid, IconButton, Zoom } from "@material-ui/core";
import React from "react";
import useStyles from "./useStyles";
import MenuEntries from "./MenuEntry/MenuEntries";
import MenuSearch from "./MenuSearch";
import MenuEntrySingle from "./MenuEntry/MenuEntrySingle";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import { setSelectedEntryName } from "./slices/orderSlice";
import { Link } from "react-router-dom";
import { handleFetchMenu } from "./slices/menuSlice";
import { Skeleton } from "@material-ui/lab";
import CartFloatButton from "./Cart/CartFloatButton";
import MenuItemEditDialog from "./MenuItem/MenuItemEditDialog";
import useBadStatus from "./useBadStatus";

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
                <IconButton color="inherit" onClick={e => dispatch(setSelectedEntryName(""))}>
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

    const MenuView = selectedEntryName ? MenuEntrySingle : MenuEntries;

    const BadStatus = useBadStatus();

    return (
        <Fade in>
            <div className={classes.menuBody}>
                {BadStatus}
                {hasMenu ? (
                    <MenuView menu={menu} selectedEntryName={selectedEntryName} />
                ) : (
                    <LoadingSkeleton />
                )}
                {hasMenu && (
                    <div>
                        <Zoom in>
                            <CartFloatButton classes={classes} menu={menu} />
                        </Zoom>
                        <MenuItemEditDialog menu={menu} classes={classes} />
                    </div>
                )}
            </div>
        </Fade>
    );
};

export default OrderMenu;
