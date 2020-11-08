import { createSlice } from "@reduxjs/toolkit";
import { getActiveMenu } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import uid from "uid";
import { itemCounterHelper, addOrderItemHelper, removeOrderItemHelper, needEditModal } from "./helper";

const initialState = {
    cart: {
        tip: 0.0,
        total: 0.0,
        orderedItems: []
    },
    editedItem: false,
    openCart: false,
    itemCounter: {},
    selectedEntryName: ""
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setEditedItemMetadata: {
            reducer(state, { payload }) {
                state.editedItem[payload.name] = payload.value;
            },
            prepare(name, value) {
                return { payload: { name, value } };
            }
        },
        saveEditedItem(state) {
            const { cart, editedItem } = state;
            if (editedItem) {
                const replaceItemIndex = cart.orderedItems.findIndex(item => item.uid === editedItem.uid);
                if (replaceItemIndex !== -1) {
                    const replaceItem = cart.orderedItems[replaceItemIndex];
                    cart.total -= replaceItem.total * replaceItem.quantity;
                    itemCounterHelper(
                        state.itemCounter,
                        replaceItem.entryName,
                        replaceItem.name,
                        -replaceItem.quantity
                    );
                    cart.orderedItems[replaceItemIndex] = editedItem;
                } else {
                    cart.orderedItems.push(editedItem);
                }
                itemCounterHelper(state.itemCounter, editedItem.entryName, editedItem.name, editedItem.quantity);
                cart.total += editedItem.total * editedItem.quantity;
            }
            state.editedItem = false;
        },
        editedItemSelectOption(state, { payload }) {
            const { selectedKey, groupName, option, editQuantity } = payload;

            let existing = state.editedItem.orderedOptions[selectedKey];

            if (existing) {
                state.editedItem.total -= existing.price * existing.quantity;
            }

            if (!editQuantity || !existing) {
                existing = state.editedItem.orderedOptions[selectedKey] = {
                    groupName,
                    price: option.price || 0,
                    name: option.name,
                    quantity: 1
                };
            } else {
                existing.quantity += editQuantity;
                if (existing.quantity === 0) {
                    delete state.editedItem.orderedOptions[selectedKey];
                }
            }
            state.editedItem.total += existing.price * existing.quantity;
        },
        setEditedItem(state, { payload }) {
            state.editedItem =
                !payload || payload.uid
                    ? payload //edit existing
                    : {
                          //edit new
                          ...payload,
                          uid: uid(),
                          total: payload.price,
                          orderedOptions: {},
                          quantity: 1
                      };
        },
        setSelectedEntryName(state, { payload }) {
            state.selectedEntryName = payload;
        },
        addOrRemoveItem(state, { payload }) {
            const { menuEntryName, menuItem, quantity } = payload;
            itemCounterHelper(state.itemCounter, menuEntryName, menuItem.name, quantity);

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

const {
    fetchMenu,
    setSelectedEntryName,
    addOrRemoveItem,
    setOpenCart,
    setTip,
    setAdditionalRequest,
    setEditedItem,
    setEditedItemMetadata,
    editedItemSelectOption,
    saveEditedItem
} = slice.actions;

export {
    setOpenCart,
    setTip,
    setAdditionalRequest,
    setEditedItem,
    setEditedItemMetadata,
    editedItemSelectOption,
    setSelectedEntryName
};

export const handleSaveEditedItem = dispatch => e => {
    dispatch(saveEditedItem());
};

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

export const handleAddOrRemoveItem = (menuEntryName, menuItem, quantity) => dispatch => e => {
    if (quantity > 0 && needEditModal(menuItem)) {
        dispatch(
            setEditedItem({
                ...menuItem,
                entryName: menuEntryName
            })
        );
    } else {
        dispatch(
            addOrRemoveItem({
                menuEntryName,
                menuItem,
                quantity
            })
        );
    }
};
