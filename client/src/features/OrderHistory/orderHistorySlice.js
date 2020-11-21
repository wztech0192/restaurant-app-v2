import { createSlice } from "@reduxjs/toolkit";
import { getOrderStatus, getRecentOrder } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import { parseLocalStorageOrDefault } from "common";
import { getAccountToken } from "features/Account/accountSlice";
import { isManager } from "features/Account/roleChecker";

let storedHistory = parseLocalStorageOrDefault("orderHistory", []);
const saveHistory = () => {
    localStorage.setItem("orderHistory", JSON.stringify(storedHistory.slice(-10)));
};

const initialState = {
    orders: undefined,
    sync: false
};

const slice = createSlice({
    name: "orderHistory",
    initialState,
    reducers: {
        fetchOrderHistory(state, { payload }) {
            state.sync = true;
            state.orders = payload || initialState.orders;
        },
        appendOrderHistory(state, { payload }) {
            if (state.orders) {
                state.orders.unshift(payload);
            }
        },
        updateOrderStatus(state, { payload }) {
            const order = state.orders.find(o => o.id === payload.id);
            if (order) {
                order.status = payload.status;
            }
        },
        unSyncOrderStatus(state) {
            if (state.orders) state.sync = false;
        }
    }
});

export default slice.reducer;

const {
    unSyncOrderStatus,
    fetchOrderHistory,
    appendOrderHistory: appendOrderHistoryAction,
    updateOrderStatus
} = slice.actions;

export const appendOrderHistory = payload => (dispatch, getState) => {
    const state = getState();
    const hasToken = getAccountToken(state);

    if (!hasToken) {
        storedHistory = [payload, ...storedHistory];
        saveHistory();
        dispatch(fetchOrderHistory(storedHistory));
    } else {
        dispatch(appendOrderHistoryAction(payload));
    }
};

const mapOrderStatus = (orders, allStatus) =>
    orders.map(h => {
        const status = allStatus[h.id];
        if (status) {
            return {
                ...h,
                status
            };
        }
        return h;
    });

export const handleFetchOrderHistory = (dispatch, getState) => {
    const hasToken = getAccountToken(getState());
    if (hasToken) {
        dispatch(
            asyncAction({
                toggleLoadingFor: "orderHistory",
                promise: getRecentOrder,
                success: orders => {
                    dispatch(fetchOrderHistory(orders));
                }
            })
        );
    } else {
        if (storedHistory.length > 0)
            dispatch(
                asyncAction({
                    toggleLoadingFor: "orderHistory",
                    promise: () => getOrderStatus(storedHistory.map(h => h.id)),
                    success: allStatus => {
                        storedHistory = mapOrderStatus(storedHistory, allStatus);
                        saveHistory();
                        dispatch(fetchOrderHistory(storedHistory));
                    }
                })
            );
        else dispatch(fetchOrderHistory(storedHistory));
    }
};

export const handleUnSyncOrderStatus = (dispatch, getState) => {
    if (getState().orderHistory.orders) {
        dispatch(unSyncOrderStatus());
    }
};

export const handleSyncOrderStatus = (dispatch, getState) => {
    const state = getState();
    const hasToken = getAccountToken(state);
    const { sync, orders } = state.orderHistory;
    if (orders && !sync) {
        console.log("get Status");
        dispatch(
            asyncAction({
                toggleLoadingFor: "orderHistory",
                promise: () => getOrderStatus(orders.map(h => h.id)),
                success: allStatus => {
                    let newOrders;
                    if (hasToken) {
                        newOrders = storedHistory = mapOrderStatus(storedHistory, allStatus);
                        saveHistory();
                    } else {
                        newOrders = mapOrderStatus(orders, allStatus);
                    }
                    dispatch(fetchOrderHistory(newOrders));
                }
            })
        );
    }
};

/**Client receivers */
const RECEIVE_ORDER = "ReceiveOrder";
const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";

let invoke = null;
export const orderHubMiddleware = (dispatch, getState, _invoke) => {
    invoke = _invoke;
    return {
        [RECEIVE_ORDER]: order => {
            if (isManager(getState())) dispatch(appendOrderHistory(order));
        },
        [UPDATE_ORDER_STATUS]: (id, status) => {
            dispatch(updateOrderStatus({ id, status }));
        }
    };
};
