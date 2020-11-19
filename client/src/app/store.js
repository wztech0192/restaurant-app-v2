import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import monitorReducersEnhancer from "./reduxStuff/monitorReducersEnhancer";
import loggerMiddleware from "./reduxStuff/reduxLogger";

import account, { tokenSubscribeListener } from "../features/Account/accountSlice";
import indicator from "./Indicator/indicatorSlice";
import hub from "app/centralHub";
import manageMenu from "features/ManageMenu/manageMenuSlice";
import order from "features/OrderMenu/slices/orderSlice";
import menu from "features/OrderMenu/slices/menuSlice";
import orderHistory from "features/OrderHistory/orderHistorySlice";

//apply reducers here
const rootReducer = combineReducers({
    account,
    indicator,
    hub,
    manageMenu,
    order,
    menu,
    orderHistory
});

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
