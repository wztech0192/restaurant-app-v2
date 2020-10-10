import { createSlice } from "@reduxjs/toolkit";
import FetchWrapper from "common/fetchWrapper";
import { postLogin } from "app/apiProvider";
import { asyncAction } from "app/sharedActions";
import { enqueueSnackbar, setErrors, setLoading } from "app/Indicator/indicatorSlice";
import { useSnackbar } from "notistack";

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
    viewMode: ACCOUNT_VIEW.CLOSE
};

const counterSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountView(state, { payload }) {
            state.viewMode = payload;
        },
        setAccountInfo(state, { payload }) {
            state.viewMode = ACCOUNT_VIEW.CLOSE;
            state.accountInfo = payload;
            state.token = payload.token;
        }
    }
});

export default counterSlice.reducer;

const { setAccountView, setAccountInfo } = counterSlice.actions;

export const getAccountToken = state => state.account.token;

export const handleSetAccountView = mode => dispatch => e => dispatch(setAccountView(mode));

export const handleLoginAccount = accountData => dispatch => e => {
    const reverseLoadingPayload = dispatch(
        setLoading({ target: "accountViewModal", loading: true })
    );
    dispatch(setErrors({ errors: undefined, target: "login" }));
    dispatch(
        asyncAction({
            hideErrorModal: true,
            promise: () => postLogin(accountData),
            success: accountInfo => {
                dispatch(setAccountInfo(accountInfo));
                dispatch(
                    enqueueSnackbar({
                        message: `Welcome back, ${accountInfo.name}!`,
                        variant: "success"
                    })
                );
            },
            failed: e => {
                let errors = "Oops, something went wrong!";
                if (e.errors && e.errors.length > 0) {
                    errors = e.errors.join(", ");
                }
                dispatch(setErrors({ errors, target: "login" }));
            },
            completed: () => {
                dispatch(setLoading(reverseLoadingPayload));
            }
        })
    );
};
