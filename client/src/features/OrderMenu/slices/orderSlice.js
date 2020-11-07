import { createSlice } from "@reduxjs/toolkit";
import { deleteMenu, getActiveMenu, getAllMenu, getMenu, postMenu } from "app/apiProvider";
import { enqueueSnackbar, handleOpenModal } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { itemCounterHelper, addOrderItemHelper, removeOrderItemHelper } from "./helper";

const initialState = {
    menu: null,
    cart: {
        tip: 0.0,
        total: 0.0,
        orderedItems: []
    },
    openCart: false,
    itemCounter: {},
    selectedEntryName: ""
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setSelectedEntryName(state, { payload }) {
            state.selectedEntryName = payload;
        },
        addOrRemoveItem(state, { payload }) {
            const { menuEntryName, menuItem, quantity } = payload;
            itemCounterHelper(state.itemCounter, menuEntryName, quantity);
            itemCounterHelper(state.itemCounter, menuItem.name, quantity);

            (quantity > 0 ? addOrderItemHelper : removeOrderItemHelper)(state.cart, menuEntryName, menuItem, quantity);
        },
        setOpenCart(state, { payload }) {
            state.openCart = payload;
        },
        setTip(state, { payload }) {
            state.cart.tip = parseFloat(payload) || 0;
        },
        setAdditionalRequest(state, { payload }) {
            state.cart.additionalRequest = payload;
        }
    }
});

export default slice.reducer;

export const getQuantity = name => state => state.order.itemCounter[name] || 0;

const { fetchMenu, setSelectedEntryName, addOrRemoveItem, setOpenCart, setTip, setAdditionalRequest } = slice.actions;

export { setOpenCart, setTip, setAdditionalRequest };

export const handleFetchMenu = dispatch => {
    dispatch(
        asyncAction({
            promise: getActiveMenu,
            success: menuInfo => {
                dispatch(fetchMenu(menuInfo));
            }
        })
    );
};

export const handleSelectEntryName = entryName => dispatch => e => {
    dispatch(setSelectedEntryName(entryName));
};

export const handleAddOrRemoveItem = (menuEntryName, menuItem, quantity) => dispatch => e => {
    dispatch(
        addOrRemoveItem({
            menuEntryName,
            menuItem,
            quantity
        })
    );
};
