import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedOrder: undefined
};

const slice = createSlice({
    name: "orderSummary",
    initialState,
    reducers: {
        setOrderSummary(state, { payload }) {
            state.selectedOrder = payload;
        }
    }
});

export default slice.reducer;

const { setOrderSummary } = slice.actions;

export { setOrderSummary };
