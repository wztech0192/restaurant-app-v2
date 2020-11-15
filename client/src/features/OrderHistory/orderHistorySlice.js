import { createSlice } from "@reduxjs/toolkit";
import { getRecentOrder } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import { getAccountToken } from "features/Account/accountSlice";

export const orderHistorySubscribeListener = store => {
    const state = store.getState();
    const token = getAccountToken(state);
    if (!token) {
        //todo: this is too heavy
        //  localStorage.setItem("orderHistory", state.orderHistory);
    }
};

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
    appendOrderHistory,
    updateOrderStatus
} = orderHubSlice.actions;

export { appendOrderHistory };

export const handleFetchOrderHistory = accountToken => (dispatch, getState) => {
    if (accountToken)
        dispatch(
            asyncAction({
                toggleLoadingFor: "orderHistory",
                promise: getRecentOrder,
                success: orders => {
                    dispatch(fetchOrderHistory(orders));
                }
            })
        );
    else {
        dispatch(fetchOrderHistory(JSON.parse(localStorage.getItem("orderHistory"))));
    }
};

/**Client receivers */
const RECEIVE_ORDER = "ReceiveOrder";

let invoke = null;
export const orderHubMiddleware = (dispatch, getState, _invoke) => {
    invoke = _invoke;
    return {
        [RECEIVE_ORDER]: order => {
            dispatch(appendOrderHistory(order));
        }
    };
};
