import { createSlice } from "@reduxjs/toolkit";
import { putOrderStatus } from "app/apiProvider";
import { LOADING } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { getAccountRole } from "features/Account/accountSlice";
import { isManager } from "features/Account/roleChecker";
import audio from "features/OrderHistory/audio";
import { updateOrderStatus } from "../OrderHistory/orderHistorySlice";

const initialState = {
    selectedOrder: undefined
};

const slice = createSlice({
    name: "orderSummary",
    initialState,
    reducers: {
        setOrderSummary(state, { payload }) {
            state.selectedOrder = payload;
        },
        updateOrderSummaryStatus(state, { payload: order }) {
            if (state.selectedOrder && state.selectedOrder.id === order.id) {
                state.selectedOrder.status = order.status;
            }
        }
    }
});

export default slice.reducer;

export const handleUpdateOrderStatus = (id, status) => dispatch => e => {
    dispatch(
        asyncAction({
            toggleLoadingFor: LOADING.GLOBAL,
            promise: () => putOrderStatus(id, status),
            success: () => {
                //close modal
                dispatch(setOrderSummary());
                //update history list
                dispatch(updateOrderStatus({ id, status }));
            }
        })
    );
};

const { setOrderSummary, updateOrderSummaryStatus } = slice.actions;

export { updateOrderSummaryStatus };

export const handleSetOrderSummary = payload => (dispatch, getState) => {
    if (isManager(getAccountRole(getState()))) {
        audio.stop();
    }
    dispatch(setOrderSummary(payload));
};
