import { createSlice } from "@reduxjs/toolkit";
import { getAllMenu, getMenu } from "app/apiProvider";
import { enqueueSnackbar, setErrors, setLoading } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { prettyJsonStringify } from "common";

export const MenuStatus = {
    New: 0,
    Draft: 1,
    Saved: 2,
    Active: 3
};

const newMenu = {
    name: ""
};

const initialState = {
    menus: undefined,
    selectedMenu: {
        name: "",
        infoJson: undefined,
        info: undefined,
        isValid: true
    }
};

const slice = createSlice({
    name: "manageMenu",
    initialState,
    reducers: {
        setMenus(state, { payload }) {
            state.menus = payload || initialState.menus;
        },
        setSelectedMenu(state, { payload }) {
            state.selectedMenu.name = payload;
            if (state.selectedMenu.name === "_new") {
                state.selectedMenu.info = newMenu;
                state.selectedMenu.infoJson = prettyJsonStringify(newMenu);
            }
        },
        setMenuInfoJson(state, { payload }) {
            state.selectedMenu.infoJson = payload;
        },
        setMenuInfo(state, { payload }) {
            state.selectedMenu.info = payload;
            state.selectedMenu.infoJson = prettyJsonStringify(payload);
        },
        formatMenuInfoJson(state) {
            try {
                state.selectedMenu.infoJson = prettyJsonStringify(
                    JSON.parse(state.selectedMenu.infoJson)
                );
                state.selectedMenu.isValid = true;
            } catch (e) {
                state.selectedMenu.isValid = false;
            }
        }
    }
});

export default slice.reducer;

const {
    setSelectedMenu,
    setMenuInfoJson,
    setMenuInfo,
    setMenus,
    formatMenuInfoJson
} = slice.actions;

let timeout;
export const handleSetMenuInfoJson = dispatch => e => {
    const json = e.target.value;
    if (timeout) {
        window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
        dispatch(formatMenuInfoJson());
        timeout = null;
    }, 350);
    dispatch(setMenuInfoJson(json));
};

export const handleSelectMenu = dispatch => e => {
    dispatch(setSelectedMenu(e.target.value));
};

export const handleFetchMenuInfo = menuName => dispatch => {
    dispatch(
        asyncAction({
            toggleLoadingFor: "manageMenu",
            promise: () => getMenu(menuName),
            success: menuInfo => {
                dispatch(setMenuInfo(menuInfo));
                dispatch(
                    enqueueSnackbar({
                        message: "Action completed!",
                        variant: "success"
                    })
                );
            }
        })
    );
};

export const handleFetchMenus = dispatch => {
    setTimeout(() => {
        dispatch(setMenus([]));
    }, 1000);

    /* dispatch(
        asyncAction({
            promise: getAllMenu,
            success: menus => dispatch(setMenus(menus))
        })
    );*/
};
