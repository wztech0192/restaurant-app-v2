import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal: {
        open: false,
        color: "primary"
    }
};

const counterSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setModal(state, { payload }) {
            state.modal = payload || initialState.modal;
        }
    }
});

export default counterSlice.reducer;

const { setModal } = counterSlice.actions;

export const handleCloseModal = dispatch => e => dispatch(setModal());

export const handleOpenModal = modalProp =>
    setModal({
        ...modalProp,
        open: true
    });
