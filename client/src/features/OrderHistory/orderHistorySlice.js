import { createSlice } from "@reduxjs/toolkit";
import { getRecentOrder } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import { parseLocalStorageOrDefault } from "common";
import { getAccountToken, isAccountLogin } from "features/Account/accountSlice";
import { isManager } from "features/Account/roleChecker";

let storedHistory = parseLocalStorageOrDefault("orderHistory", []);

const initialState = null;

const orderHubSlice = createSlice({
    name: "orderHistory",
    initialState,
    reducers: {
        clearOrderHistory() {
            return initialState;
        },
        fetchOrderHistory(_, { payload }) {
            return payload || initialState;
        },
        appendOrderHistory(state, { payload }) {
            if (state) {
                state.unshift(payload);
            }
        },
        updateOrderStatus(state, { payload }) {
            const order = state.find(o => o.id === payload.id);
            if (order) {
                order.status = payload.status;
            }
        }
    }
});

export default orderHubSlice.reducer;

const {
    clearOrderHistory,
    fetchOrderHistory,
    appendOrderHistory: appendOrderHistoryAction,
    updateOrderStatus
} = orderHubSlice.actions;

export const appendOrderHistory = payload => (dispatch, getState) => {
    const state = getState();
    const isLogin = isAccountLogin(state);

    if (!isLogin) {
        storedHistory = [payload, ...storedHistory];
        localStorage.setItem("orderHistory", JSON.stringify(storedHistory.slice(-10)));
        dispatch(fetchOrderHistory(storedHistory));
    } else {
        dispatch(appendOrderHistoryAction(payload));
    }
};

export const handleFetchOrderHistory = isLogin => dispatch => {
    if (isLogin) {
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
        dispatch(fetchOrderHistory(storedHistory));
    }
};

/**Client receivers */
const RECEIVE_ORDER = "ReceiveOrder";

let invoke = null;
export const orderHubMiddleware = (dispatch, getState, _invoke) => {
    invoke = _invoke;
    return {
        [RECEIVE_ORDER]: order => {
            if (isManager(getState())) dispatch(appendOrderHistory(order));
        }
    };
};
