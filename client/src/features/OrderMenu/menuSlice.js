import { createSlice } from "@reduxjs/toolkit";
import { getActiveMenu } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";

const initialState = null;

const slice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        fetchMenu(state, { payload }) {
            return payload;
        }
    }
});

export default slice.reducer;

const { fetchMenu } = slice.actions;

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
