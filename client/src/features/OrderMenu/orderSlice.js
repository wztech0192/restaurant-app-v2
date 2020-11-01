import { createSlice } from "@reduxjs/toolkit";
import { deleteMenu, getAllMenu, getMenu, postMenu } from "app/apiProvider";
import { enqueueSnackbar, handleOpenModal } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { prettyJsonStringify } from "common";

const newOrder = {
    id: -1,
    name: "Place holder"
};

const initialState = {
    order: {
        tip: 0.0,
        total: 0.0,
        orderedItems: []
    },
    selectedEntryName: ""
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setSelectedEntryName(state, { payload }) {
            state.selectedEntryName = payload;
        }
    }
});

export default slice.reducer;

const { setSelectedEntryName } = slice.actions;

export const handleSelectEntryName = entryName => dispatch => e => {
    dispatch(setSelectedEntryName(entryName));
};
