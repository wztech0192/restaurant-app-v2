import { createSlice } from "@reduxjs/toolkit";
import { getOrderQuery, getOrderStatus, getRecentOrder } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import { parseLocalStorageOrDefault } from "common";
import { getAccountRole, getAccountToken } from "features/Account/accountSlice";
import { isManager } from "features/Account/roleChecker";
import uid from "uid";
import moment from "moment";
import OrderStatus from "./orderStatus";
import { updateOrderSummaryStatus } from "../OrderSummary/orderSummarySlice";
import audio from "./audio";

let storedHistory = parseLocalStorageOrDefault("orderHistory", []);
const saveHistory = () => {
    localStorage.setItem("orderHistory", JSON.stringify(storedHistory.slice(-10)));
};

const today = moment().format("MM/DD/YYYY");

const initialState = {
    filter: {
        dateRange: [today, today],
        status: [OrderStatus.Pending]
    },
    orders: undefined,
    sync: false
};

const slice = createSlice({
    name: "orderHistory",
    initialState,
    reducers: {
        updateFilter(state, { payload }) {
            for (let key in payload) {
                state.filter[key] = payload[key];
            }
        },
        fetchOrderHistory(state, { payload }) {
            state.sync = true;
            state.orders = payload || initialState.orders;
        },
        appendOrderHistory(state, { payload: newOrder }) {
            if (state.orders) {
                if (!state.orders.some(order => order.id === newOrder.id)) {
                    state.orders.unshift(newOrder);
                }
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
    updateOrderStatus,
    updateFilter
} = slice.actions;
export { updateFilter, updateOrderStatus };

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

let queryBuff = null;
export const handleQueryOrder = filter => dispatch => {
    const queryId = uid();
    queryBuff = queryId;
    dispatch(
        asyncAction({
            toggleLoadingFor: "orderHistory",
            promise: () => getOrderQuery(filter),
            success: orders => {
                if (queryBuff === queryId) {
                    dispatch(fetchOrderHistory(orders));
                } else {
                    return false;
                }
            }
        })
    );
};

export const handleFetchRecentOrderHistory = (dispatch, getState) => {
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
const UPDATE_ORDER_STATUS = "UpdateOrderStatus";

export const orderHistoryHubMiddleware = (dispatch, getState) => {
    return {
        [RECEIVE_ORDER]: order => {
            const state = getState();
            if (isManager(getAccountRole(state))) {
                audio.play();
                dispatch(appendOrderHistory(order));
            }
        },
        [UPDATE_ORDER_STATUS]: (id, status) => {
            if (isManager(getAccountRole(getState()))) {
                audio.stop();
            }

            dispatch(updateOrderStatus({ id, status }));
            dispatch(updateOrderSummaryStatus({ id, status }));
        }
    };
};
