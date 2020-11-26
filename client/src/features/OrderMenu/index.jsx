import { Card, CardContent, Fade, Grid, IconButton, Typography, Zoom } from "@material-ui/core";
import React from "react";
import useStyles from "./useStyles";
import MenuEntries from "./MenuEntry/MenuEntries";
import MenuSearch from "./MenuSearch";
import MenuEntrySingle from "./MenuEntry/MenuEntrySingle";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { setSelectedEntryName, loadCart } from "./slices/orderSlice";
import { handleFetchMenu } from "./slices/menuSlice";
import { Skeleton } from "@material-ui/lab";
import CartFloatButton from "./Cart/CartFloatButton";
import MenuItemEditDialog from "./MenuItem/MenuItemEditDialog";
import useBadStatus from "./useBadStatus";
import { handleFetchOrderRules } from "features/ManageOrderRules/orderRuleSlice";
import SkeletonWrapper from "common/components/SkeletonWrapper";
import { parseLocalStorageOrDefault } from "common";
//import menu from "assets/menuSample.json";

const LoadingSkeleton = () => (
    <Grid container spacing={2}>
        {Array(11)
            .fill()
            .map((_, i) => (
                <Grid key={i} item md={6} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">
                                <Skeleton width="150px" />
                            </Typography>
                            <Typography variant="body2" width="250px" color="textSecondary" component="p">
                                <Skeleton />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
    </Grid>
);

const OrderMenu = ({ setHeader }) => {
    const classes = useStyles();
    const selectedEntryName = useSelector(state => state.order.selectedEntryName);

    const menu = useSelector(state => state.menu);
    const orderRules = useSelector(state => state.orderRules);
    const hasMenu = Boolean(menu);
    const hasRules = Boolean(orderRules);

    const dispatch = useDispatch();
    const isSelected = Boolean(selectedEntryName);

    React.useEffect(() => {
        setHeader({
            title: <MenuSearch />,
            action: isSelected ? (
                <IconButton color="inherit" onClick={e => dispatch(setSelectedEntryName(""))}>
                    <ArrowBackIcon />
                </IconButton>
            ) : undefined
        });
    }, [setHeader, isSelected, dispatch]);

    React.useEffect(() => {
        if (!hasMenu) {
            dispatch(
                handleFetchMenu(undefined, menu => {
                    const savedCart = parseLocalStorageOrDefault("savedCart", false);
                    if (savedCart) {
                        //note: save previous cart data in ./Cart/CartSwipeView useEffect
                        if (savedCart.menuId === menu.id) {
                            //load previous cart data
                            dispatch(loadCart(savedCart));
                        } else {
                            localStorage.removeItem("savedCart");
                        }
                    }
                })
            );
        }
    }, [hasMenu, dispatch]);

    React.useEffect(() => {
        if (!hasRules) {
            dispatch(handleFetchOrderRules);
        }
    }, [hasRules, dispatch]);

    const MenuView = selectedEntryName ? MenuEntrySingle : MenuEntries;

    const BadStatus = useBadStatus();

    const loading = !hasRules || !hasMenu;

    return (
        <Fade in>
            <div className={classes.menuBody}>
                {BadStatus}
                <SkeletonWrapper Animation={Fade} loading={loading} fill CustomSkeleton={<LoadingSkeleton />}>
                    <MenuView orderRules={orderRules} menu={menu} selectedEntryName={selectedEntryName} />
                </SkeletonWrapper>
                <Zoom in={!loading}>
                    <CartFloatButton orderRules={orderRules} classes={classes} menu={menu} />
                </Zoom>
                {!loading && <MenuItemEditDialog menu={menu} classes={classes} />}
            </div>
        </Fade>
    );
};

export default OrderMenu;
