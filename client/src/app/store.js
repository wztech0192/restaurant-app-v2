import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import monitorReducersEnhancer from "./reduxStuff/monitorReducersEnhancer";
import loggerMiddleware from "./reduxStuff/reduxLogger";

import account, { tokenSubscribeListener } from "./Account/accountSlice";
import indicator from "./Indicator/indicatorSlice";
import orderHub from "./signalRHubs/ordersHub";
import manageMenu from "features/ManageMenu/manageMenuSlice";
import order from "features/OrderMenu/slices/orderSlice";
import menu from "features/OrderMenu/slices/menuSlice";

//apply reducers here
const rootReducer = combineReducers({ account, indicator, orderHub, manageMenu, order, menu });

function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [loggerMiddleware, ...getDefaultMiddleware()],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    });

    const subscribeListeners = [tokenSubscribeListener];
    if (subscribeListeners.length > 0) {
        store.subscribe(() => {
            for (var subscribeListener of subscribeListeners) {
                subscribeListener(store);
            }
        });
    }
    return store;
}

export default configureAppStore();
