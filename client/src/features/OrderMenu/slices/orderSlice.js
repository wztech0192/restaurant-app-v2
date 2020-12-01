import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "app/apiProvider";
import history from "app/history";
import { handleOpenModal, LOADING, enqueueSnackbar } from "app/Indicator/indicatorSlice";
import { asyncAction, encryptionAction } from "app/sharedActions";
import { handleGetAccountInfo } from "features/Account/accountSlice";
import { appendOrderHistory } from "features/OrderHistory/orderHistorySlice";
import { handleSetOrderSummary } from "features/OrderSummary/orderSummarySlice";
import uid from "uid";
import OrderSubmitMessage from "../OrderSubmitMessage";
import {
    itemCounterHelper,
    addOrderItemHelper,
    removeOrderItemHelper,
    needEditModal
} from "./helper";
import { handleFetchMenu } from "./menuSlice";

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

        loadCart(state, { payload: newOrder }) {
            state.openCart = true;
            state.cart.tip = newOrder.tip;
            state.cart.price = newOrder.price;
            state.cart.orderedItems = newOrder.orderedItems || [];

            for (let item of state.cart.orderedItems) {
                itemCounterHelper(state.itemCounter, item.entryName, item.name, item.quantity);
            }
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
            const {
                selectedKey,
                groupName,
                option,
                editQuantity,
                optionPriceMultiplier = 1
            } = payload;

            const _selectedKey = selectedKey.toLowerCase();
            let existing = state.editedItem.orderedOptions[_selectedKey];

            if (existing) {
                state.editedItem.price -= existing.price * existing.quantity;
            }
            if (!editQuantity || !existing) {
                existing = state.editedItem.orderedOptions[_selectedKey] = {
                    groupName,
                    price: (option.price || 0) * optionPriceMultiplier,
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
    loadCart,
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
    setSelectedEntryName,
    loadCart
};

export const handleSaveEditedItem = dispatch => e => {
    dispatch(saveEditedItem());
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
    } else {
        payload.saveCard = saveCard;

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
                localStorage.removeItem("savedCart");
                dispatch(
                    handleOpenModal({
                        title: "Order Submitted!",
                        content: OrderSubmitMessage(order.id)
                    })
                );
                history.push("/");
                dispatch(appendOrderHistory(order));
                if (saveCard) {
                    dispatch(handleGetAccountInfo);
                }
            }
        })
    );
};

export const handleBuyAgain = (dispatch, getState) => {
    const state = getState();
    const buyAgainOrder = state.orderSummary.selectedOrder;
    const menu = state.menu;
    if (menu) {
        dispatch(resolveBuyAgain(buyAgainOrder, menu));
    } else {
        dispatch(
            handleFetchMenu(LOADING.GLOBAL, menu => {
                dispatch(resolveBuyAgain(buyAgainOrder, menu));
            })
        );
    }
};

export const resolveBuyAgain = (order, menu) => dispatch => {
    if (order.menuId === menu.id) {
        dispatch(loadCart(order));
        //close selected order summary
        dispatch(handleSetOrderSummary());
        history.push("/order");
    } else {
        dispatch(
            enqueueSnackbar({
                message: "The menu has been updated since this order!",
                variant: "error"
            })
        );
    }
};
