import { createSlice } from "@reduxjs/toolkit";
import uid from "uid";

const initialState = {
    modal: {
        open: false,
        color: "primary"
    },
    errors: {},
    loading: {},
    notifications: []
};

const slice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setModal(state, { payload }) {
            state.modal = payload || initialState.modal;
        },
        setErrors(state, { payload }) {
            if (payload.target) {
                state.errors[payload.target] = payload.errors;
                if (payload.toggleLoading) {
                    state.loading[payload.target] = false;
                }
            } else {
                state.errors = payload.errors || {};
            }
        },
        setLoading(state, { payload }) {
            state.loading[payload.target] = payload.loading;
        },
        enqueueSnackbar(state, { payload }) {
            const key = (payload && payload.key) || uid();

            if (typeof payload === "string") {
                state.notifications.push({
                    key,
                    message: payload
                });
            } else {
                state.notifications.push({
                    key,
                    message: payload.message,
                    options: payload
                });
            }
        },
        removeSnackbar(state, { payload }) {
            state.notifications = state.notifications.filter(n => n.key !== payload);
        }
    }
});

export default slice.reducer;

const {
    setModal,
    setErrors,
    setLoading: setLoadingAction,
    enqueueSnackbar,
    removeSnackbar
} = slice.actions;

const setLoading = payload => dispatch => {
    dispatch(setLoadingAction(payload));
    return {
        ...payload,
        loading: !payload.loading
    };
};
export { setErrors, setLoading, enqueueSnackbar, removeSnackbar };

export const getErrors = target => state =>
    !target ? state.indicator.errors : state.indicator.errors[target];

export const getLoading = target => state => !!state.indicator.loading[target];

export const handleCloseModal = dispatch => e => dispatch(setModal());

export const handleOpenModal = modalProp =>
    setModal({
        ...modalProp,
        open: true
    });
