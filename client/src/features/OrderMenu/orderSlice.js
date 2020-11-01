import { createSlice } from "@reduxjs/toolkit";
import { deleteMenu, getActiveMenu, getAllMenu, getMenu, postMenu } from "app/apiProvider";
import { enqueueSnackbar, handleOpenModal } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { prettyJsonStringify } from "common";

const itemCounterHelper = (itemCounter, name, added) => {
    const quantity = (itemCounter[name] || 0) + added;
    itemCounter[name] = quantity > 0 ? quantity : 0;
};

const addOrderItemHelper = (cart, menuEntry, menuItem, quantity) => {
    const orderedItem = {
        entryName: menuEntry.name,
        name: menuItem.name,
        total: menuItem.price,
        itemId: menuItem.id,
        quantity,
        sides: [],
        requiredOptions: []
    };
    cart.orderedItems.push(orderedItem);
    cart.total += orderedItem.total * quantity;
};

const removeOrderItemHelper = (cart, menuEntry, menuItem, quantity) => {
    //starting from the end, find the last added item based on entry name and item name
    for (let i = cart.orderedItems.length - 1; i >= 0; i--) {
        const item = cart.orderedItems[i];
        if (item.name === menuItem.name && item.entryName === menuEntry.name) {
            const newQuantity = item.quantity + quantity; //quantity is a negative number in this case

            if (newQuantity <= 0) {
                //remove item
                cart.total -= item.total * item.quantity;
                cart.orderedItems.splice(i, 1);
            } else {
                //decreate quantity of the item
                cart.total -= item.total * Math.abs(quantity);
                item.quantity = newQuantity;
            }

            if (newQuantity < 0) {
                //continue to remove next item if there are any left over unremoved quantity
                quantity = Math.abs(newQuantity);
            } else {
                return;
            }
        }
    }
};

const initialState = {
    menu: null,
    cart: {
        tip: 0.0,
        total: 0.0,
        orderedItems: []
    },
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
            const { menuEntry, menuItem, quantity } = payload;
            itemCounterHelper(state.itemCounter, menuEntry.name, quantity);
            itemCounterHelper(state.itemCounter, menuItem.name, quantity);

            (quantity > 0 ? addOrderItemHelper : removeOrderItemHelper)(
                state.cart,
                menuEntry,
                menuItem,
                quantity
            );
        }
    }
});

export default slice.reducer;

export const getQuantity = name => state => state.order.itemCounter[name] || 0;

const { fetchMenu, setSelectedEntryName, addOrRemoveItem } = slice.actions;

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

export const handleAddOrRemoveItem = (menuEntry, menuItem, quantity) => dispatch => e => {
    dispatch(
        addOrRemoveItem({
            menuEntry,
            menuItem,
            quantity
        })
    );
};
