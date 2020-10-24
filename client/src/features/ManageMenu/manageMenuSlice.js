import { createSlice } from "@reduxjs/toolkit";
import { deleteMenu, getAllMenu, getMenu, postMenu } from "app/apiProvider";
import { enqueueSnackbar, handleOpenModal } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { prettyJsonStringify } from "common";

export const MenuStatus = {
    New: 0,
    Draft: 1,
    Saved: 2,
    Active: 3
};

const newMenu = {
    id: -1,
    status: MenuStatus.New
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

const reduceSelectMenu = (state, id) => {
    state.selectedMenu.id = id;
    if (state.selectedMenu.id === newMenu.id) {
        state.selectedMenu.info = newMenu;
        state.selectedMenu.infoJson = prettyJsonStringify(newMenu);
    } else {
        state.selectedMenu.info = undefined;
        state.selectedMenu.infoJson = undefined;
        state.selectedMenu.isValid = true;
    }
};

const slice = createSlice({
    name: "manageMenu",
    initialState,
    reducers: {
        removeMenu(state, { payload }) {
            state.selectedMenu = initialState.selectedMenu;
            state.menus = state.menus.filter(menu => menu.id !== payload);
        },
        cloneMenu(state) {
            state.selectedMenu.id = newMenu.id;
            state.selectedMenu.info = newMenu;
        },
        setMenus(state, { payload }) {
            state.menus = payload || initialState.menus;
        },
        setSelectedMenu(state, { payload }) {
            reduceSelectMenu(state, payload);
        },
        setMenuInfoJson(state, { payload }) {
            state.selectedMenu.infoJson = payload;
        },
        setMenuInfo(state, { payload }) {
            state.selectedMenu.info = payload;
            const tempInfo = { ...payload };
            //remove not changeable properties
            delete tempInfo.status;
            delete tempInfo.id;
            state.selectedMenu.infoJson = prettyJsonStringify(tempInfo);

            //update dropdown
            const updateIndex = state.menus.findIndex(menu => menu.id === payload.id);
            const newDropdown = {
                name: payload.name,
                id: payload.id,
                status: payload.status
            };
            if (updateIndex > -1) {
                state.menus[updateIndex] = newDropdown;
            } else {
                state.menus.push(newDropdown);
            }
            //select if not equal
            if (state.selectedMenu.id !== payload.id) {
                reduceSelectMenu(state, payload.id);
            }
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
    cloneMenu,
    setSelectedMenu,
    setMenuInfoJson,
    setMenuInfo,
    setMenus,
    formatMenuInfoJson,
    removeMenu
} = slice.actions;

export const handleCloneMenu = dispatch => e => {
    dispatch(cloneMenu());
};

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
    const { infoJson, info } = getState().manageMenu.selectedMenu;
    const menu = JSON.parse(infoJson);
    menu.id = info.id;
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

export const handleRemoveMenu = (dispatch, getState) => e => {
    const id = getState().manageMenu.selectedMenu.info.id;
    dispatch(
        handleOpenModal({
            title: "Remove Confirmation",
            titleColor: "secondary",
            message: "Are you sure you want to permanently remove this menu?",
            onConfirm: () => {
                dispatch(
                    asyncAction({
                        toggleLoadingFor: "manageMenu",
                        promise: () => deleteMenu(id),
                        success: () => {
                            dispatch(removeMenu(id));
                            dispatch(
                                enqueueSnackbar({
                                    message: "Menu removed!"
                                })
                            );
                        }
                    })
                );
            }
        })
    );
};
