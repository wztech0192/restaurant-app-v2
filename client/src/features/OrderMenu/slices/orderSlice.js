import { createSlice } from "@reduxjs/toolkit";
import { getActiveMenu, postOrder } from "app/apiProvider";
import history from "app/history";
import { handleOpenModal, LOADING } from "app/Indicator/indicatorSlice";
import { asyncAction, encryptionAction } from "app/sharedActions";
import { appendOrderHistory } from "features/OrderHistory/orderHistorySlice";
import uid from "uid";
import OrderSubmitMessage from "../OrderSubmitMessage";
import {
    itemCounterHelper,
    addOrderItemHelper,
    removeOrderItemHelper,
    needEditModal
} from "./helper";

const initialState = {
    cart: {
        tip: 0.0,
        price: 0.0,
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
        clearOrder() {
            return initialState;
        },
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
                const replaceItemIndex = cart.orderedItems.findIndex(
                    item => item.uid === editedItem.uid
                );
                if (replaceItemIndex !== -1) {
                    const replaceItem = cart.orderedItems[replaceItemIndex];
                    cart.price -= replaceItem.price * replaceItem.quantity;
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
                itemCounterHelper(
                    state.itemCounter,
                    editedItem.entryName,
                    editedItem.name,
                    editedItem.quantity
                );
                cart.price += editedItem.price * editedItem.quantity;
            }
            state.editedItem = false;
        },
        editedItemSelectOption(state, { payload }) {
            const { selectedKey, groupName, option, editQuantity } = payload;

            const _selectedKey = selectedKey.toLowerCase();
            let existing = state.editedItem.orderedOptions[_selectedKey];

            if (existing) {
                state.editedItem.price -= existing.price * existing.quantity;
            }

            if (!editQuantity || !existing) {
                existing = state.editedItem.orderedOptions[_selectedKey] = {
                    groupName,
                    price: option.price || 0,
                    name: option.name,
                    optionId: option.id,
                    quantity: 1,
                    key: _selectedKey
                };
            } else {
                existing.quantity += editQuantity;
                if (existing.quantity === 0) {
                    delete state.editedItem.orderedOptions[_selectedKey];
                }
            }
            state.editedItem.price += existing.price * existing.quantity;
        },
        setEditedItem(state, { payload }) {
            state.editedItem =
                !payload || payload.uid
                    ? payload //edit existing
                    : {
                          //edit new
                          ...payload,
                          itemId: payload.id,
                          uid: uid(),
                          price: payload.price,
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

            (quantity > 0 ? addOrderItemHelper : removeOrderItemHelper)(
                state.cart,
                menuEntryName,
                menuItem,
                quantity
            );
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
    saveEditedItem,
    clearOrder
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

export const handleSubmitOrder = (paymentInfo, payWithExistingCard, saveCard) => (
    dispatch,
    getState
) => e => {
    const order = getState().order.cart;
    const payload = {
        ...order,
        name: paymentInfo.name,
        phone: paymentInfo.phone
    };

    if (payWithExistingCard) {
        payload.cardId = paymentInfo.cardId;
        payload.saveCard = saveCard;
    } else {
        const json = JSON.stringify({
            card: paymentInfo.card,
            expireDate: paymentInfo.expireDate
        });
        payload.lastFourDigit = paymentInfo.card.slice(-4);
        dispatch(
            encryptionAction(json, encryptedCardInfo => {
                payload.encryptedCardInfo = encryptedCardInfo;
            })
        );

        if (!payload.encryptedCardInfo) {
            return;
        }
    }

    dispatch(
        asyncAction({
            toggleLoadingFor: LOADING.GLOBAL,
            promise: () => postOrder(payload),
            success: order => {
                dispatch(clearOrder());
                dispatch(
                    handleOpenModal({
                        title: "Order Submitted!",
                        content: OrderSubmitMessage(order.id)
                    })
                );
                history.push("/");
                dispatch(appendOrderHistory(order));
            }
        })
    );
};
