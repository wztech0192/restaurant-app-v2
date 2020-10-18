import { createSlice } from "@reduxjs/toolkit";
import { getAllMenu, getMenu, postMenu } from "app/apiProvider";
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
    id: -1
};

const initialState = {
    menus: undefined,
    selectedMenu: {
        id: "",
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
            state.selectedMenu.id = payload;
            if (state.selectedMenu.id === newMenu.id) {
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
    let selectedID = parseInt(e.target.value) || 0;
    dispatch(setSelectedMenu(selectedID));
};

export const handleFetchMenuInfo = id => dispatch => {
    dispatch(
        asyncAction({
            toggleLoadingFor: "manageMenu",
            promise: () => getMenu(id),
            success: menuInfo => {
                dispatch(setMenuInfo(menuInfo));
            }
        })
    );
};

export const handleFetchMenus = dispatch => {
    dispatch(
        asyncAction({
            promise: getAllMenu,
            success: menus => dispatch(setMenus(menus))
        })
    );
};

export const handleSaveMenu = (dispatch, getState) => e => {
    const infoJson = getState().manageMenu.selectedMenu.infoJson;
    const menu = JSON.parse(infoJson);
    dispatch(
        asyncAction({
            toggleLoadingFor: "manageMenu",
            promise: () => postMenu(menu),
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
