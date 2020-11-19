import { createSlice } from "@reduxjs/toolkit";
import FetchWrapper from "common/fetchWrapper";
import { postLogin, postAccount, getAccount, putAccount } from "app/apiProvider";
import { asyncAction, encryptionAction } from "app/sharedActions";
import {
    enqueueSnackbar,
    setErrors,
    setGlobalLoading,
    setLoading
} from "app/Indicator/indicatorSlice";
import encryptionProvider from "common/encryptionProvider";
import getUID from "common/getUID";
import history from "app/history";

//save/retrieve token from local storage
const TOKEN_KEY = "TOKEN_KEY";
let localStoredToken = undefined;

export const tokenSubscribeListener = store => {
    const token = getAccountToken(store.getState());
    if (localStoredToken !== token) {
        localStoredToken = token;
        if (localStoredToken) {
            localStorage.setItem(TOKEN_KEY, localStoredToken);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
        FetchWrapper.setToken(token);
    }
};

export const ACCOUNT_VIEW = {
    CLOSE: "CLOSE",
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    PROFILE: "PROFILE"
};

const initialState = {
    token: undefined,
    accountInfo: undefined,
    viewMode: ACCOUNT_VIEW.CLOSE,
    editAccountInfo: {
        cards: []
    }
};

const slice = createSlice({
    name: "account",
    initialState,
    reducers: {
        reset() {
            return initialState;
        },
        addNewCard(state, { payload }) {
            if (state.editAccountInfo.cards.length === 0) {
                payload.useAsDefault = true;
                state.editAccountInfo.defaultCardId = payload.id;
            }
            state.editAccountInfo.cards.push(payload);
        },
        removeCard(state, { payload }) {
            state.editAccountInfo.cards = state.editAccountInfo.cards.filter(
                card => card.id !== payload
            );
            if (state.editAccountInfo.defaultCardId === payload) {
                if (state.editAccountInfo.cards.length > 0) {
                    state.editAccountInfo.defaultCardId = state.editAccountInfo.cards[0].id;
                } else {
                    state.editAccountInfo.defaultCardId = 0;
                }
            }
        },
        setCardAsDefault(state, { payload }) {
            for (let card of state.editAccountInfo.cards) {
                if (card.id === payload) {
                    card.useAsDefault = true;
                } else {
                    card.useAsDefault = false;
                }
            }
            state.editAccountInfo.defaultCardId = payload;
        },
        setToken(state, { payload }) {
            state.token = payload;
        },
        setAccountView(state, { payload }) {
            state.viewMode = payload;
            state.editAccountInfo = initialState.editAccountInfo;
        },
        setAccountInfo(state, { payload }) {
            state.viewMode = ACCOUNT_VIEW.CLOSE;
            state.accountInfo = payload;
            state.token = payload.token;
        },
        loadAccountInfo(state, { payload }) {
            state.accountInfo = payload.accountInfo;
            if (payload.close) {
                state.viewMode = ACCOUNT_VIEW.CLOSE;
                state.editAccountInfo = initialState.editAccountInfo;
            }
        },
        editAccountInfo(state, { payload }) {
            state.editAccountInfo[payload.name] = payload.value;
        },
        setEditAccountInfo(state, { payload }) {
            state.editAccountInfo = payload || initialState.editAccountInfo;
        }
    }
});

export default slice.reducer;

export const getAccountToken = state => state.account.token;
export const isAccountLogin = state => Boolean(state.account.token && state.account.accountInfo);
export const getAccountRole = state =>
    state.account.accountInfo ? state.account.accountInfo.role : "ANONYMOUS";

const {
    setAccountView,
    setAccountInfo,
    editAccountInfo,
    addNewCard,
    loadAccountInfo,
    setToken,
    reset,
    setEditAccountInfo,
    setCardAsDefault,
    removeCard
} = slice.actions;

export { setEditAccountInfo, editAccountInfo, removeCard, setCardAsDefault };

export const handleLogout = dispatch => e => {
    dispatch(reset());
    dispatch(
        enqueueSnackbar({
            message: `You are signed out`
        })
    );
    history.push("/");
};

export const handleEditAccountInfo = dispatch => e =>
    dispatch(
        editAccountInfo({
            name: e.target.name,
            value: e.target.value
        })
    );
export const handleEditAccountInfoPhone = dispatch => e =>
    dispatch(
        editAccountInfo({
            name: "phone",
            value: e.target.value.replace(/[\D]/g, "")
        })
    );

export const handleSetAccountView = mode => dispatch => e => dispatch(setAccountView(mode));

export const handleGetAccountInfo = dispatch => {
    dispatch(
        asyncAction({
            promise: getAccount,
            success: accountInfo => dispatch(loadAccountInfo({ accountInfo })),
            failed: e => {
                if (e !== "TypeError: Failed to fetch") {
                    FetchWrapper.setToken("");
                    //todo: fetch current account?
                    dispatch(reset());
                    dispatch(setAccountView(ACCOUNT_VIEW.CLOSE));
                }
            },
            completed: () => {
                dispatch(setGlobalLoading(false));
            }
        })
    );
};

export const handleLoadLocalAccount = dispatch => {
    const localToken = localStorage.getItem(TOKEN_KEY);

    if (localToken) {
        FetchWrapper.setToken(localToken);
        //todo: fetch current account?
        dispatch(setToken(localToken));
        dispatch(handleGetAccountInfo);
    } else {
        dispatch(setGlobalLoading(false));
    }
};

export const handleLoginAccount = (accountData, actionType) => dispatch => e => {
    const apiCall = actionType === "login" ? postLogin : postAccount;
    const reverseLoadingPayload = dispatch(setLoading({ target: "account", loading: true }));
    dispatch(setErrors({ target: "account" }));
    dispatch(
        asyncAction({
            hideErrorModal: true,
            promise: () => apiCall(accountData),
            success: accountInfo => {
                dispatch(setAccountInfo(accountInfo));
                console.log("test", accountInfo.phone);
                localStorage.setItem("previousLoginPhone", accountInfo.phone);
                dispatch(
                    enqueueSnackbar({
                        message: `Hello, ${accountInfo.name}!`,
                        variant: "success"
                    })
                );
                dispatch(setLoading(reverseLoadingPayload));
            },
            failed: e => {
                let errors = "Oops, something went wrong!";
                if (e.errors && e.errors.length > 0) {
                    if (actionType === "login")
                        dispatch(
                            editAccountInfo({
                                name: "password",
                                value: ""
                            })
                        );
                    errors = e.errors;
                }
                dispatch(setErrors({ errors, target: "account", toggleLoading: true }));
            }
        })
    );
};

export const handleUpdateAccount = changePassword => (dispatch, getState) => e => {
    const reverseLoadingPayload = dispatch(setLoading({ target: "account", loading: true }));

    let state = getState().account.editAccountInfo;

    if (!changePassword) {
        state = { ...state };
        delete state.newPassword;
    }

    dispatch(setErrors({ target: "account" }));
    dispatch(
        asyncAction({
            hideErrorModal: true,
            promise: () => putAccount(state),
            success: accountInfo => {
                dispatch(loadAccountInfo({ accountInfo, close: true }));
                dispatch(
                    enqueueSnackbar({
                        message: "Account successfully updated!",
                        variant: "success"
                    })
                );
                dispatch(setLoading(reverseLoadingPayload));
            },
            failed: e => {
                let errors = "Oops, something went wrong!";
                if (e.errors && e.errors.length > 0) {
                    dispatch(
                        editAccountInfo({
                            name: "password",
                            value: ""
                        })
                    );
                    errors = e.errors;
                }
                dispatch(setErrors({ errors, target: "account", toggleLoading: true }));
            }
        })
    );
};

export const handleAddNewCard = paymentInfo => dispatch => {
    const json = JSON.stringify(paymentInfo);
    const lastFourDigit = paymentInfo.card.slice(-4);

    dispatch(
        encryptionAction(json, encryptedCardInfo => {
            dispatch(
                addNewCard({
                    id: getUID(),
                    encryptedCardInfo,
                    lastFourDigit
                })
            );
        })
    );
};
