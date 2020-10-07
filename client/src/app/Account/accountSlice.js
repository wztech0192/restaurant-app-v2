import { createSlice } from "@reduxjs/toolkit";
import FetchWrapper from "common/fetchWrapper";
import { postLogin } from "app/apiProvider";

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

const initialState = { token: localStoredToken, account: undefined, openLogin: false };

const counterSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        toggleLogin(state) {
            state.openLogin = !state.openLogin;
        }
    }
});

export default counterSlice.reducer;

const { toggleLogin } = counterSlice.actions;

export const getAccountToken = state => state.account.token;
export const handleToggleLogin = e => toggleLogin();
