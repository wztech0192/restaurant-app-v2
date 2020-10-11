import { createSlice } from "@reduxjs/toolkit";
import FetchWrapper from "common/fetchWrapper";
import { postLogin, postAccount, getAccount } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import { enqueueSnackbar, setErrors, setLoading } from "app/Indicator/indicatorSlice";

//save/retrieve token from local storage
const TOKEN_KEY = "TOKEN_KEY";
let localStoredToken = localStorage.getItem(TOKEN_KEY);
FetchWrapper.setToken(localStoredToken);

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
    token: localStoredToken,
    accountInfo: undefined,
    viewMode: ACCOUNT_VIEW.CLOSE,
    editAccountInfo: {}
};

const counterSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
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
            state.accountInfo = payload;
        },
        editAccountInfo(state, { payload }) {
            state.editAccountInfo[payload.name] = payload.value;
        }
    }
});

export default counterSlice.reducer;

const { setAccountView, setAccountInfo, editAccountInfo, loadAccountInfo } = counterSlice.actions;

export const handleEditAccountInfo = dispatch => e =>
    dispatch(
        editAccountInfo({
            name: e.target.name,
            value: e.target.value
        })
    );

export const getAccountToken = state => state.account.token;

export const handleSetAccountView = mode => dispatch => e => dispatch(setAccountView(mode));

export const handleGetAccountInfo = dispatch => {
    dispatch(
        asyncAction({
            promise: getAccount,
            success: accountInfo => dispatch(loadAccountInfo(accountInfo)),
            failed: e => dispatch(setAccountView(ACCOUNT_VIEW.CLOSE))
        })
    );
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
