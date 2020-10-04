import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: localStorage.getItem("token"), account: undefined, openLogin: false };

const counterSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        toggleLogin(state) {
            state.openLogin = !state.openLogin;
        }
    }
});

const { toggleLogin } = counterSlice.actions;

export const getAccountToken = state => state.account.token;
export const handleToggleLogin = e => toggleLogin();

export default counterSlice.reducer;
