rimport { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import monitorReducersEnhancer from "./reduxStuff/monitorReducersEnhancer";
import loggerMiddleware from "./reduxStuff/reduxLogger";

import account, { tokenSubscribeListener } from "../features/Account/accountSlice";
import indicator from "./Indicator/indicatorSlice";
import hub from "app/centralHub";
import manageMenu from "features/ManageMenu/manageMenuSlice";
import order from "features/OrderMenu/slices/orderSlice";
import menu from "features/OrderMenu/slices/menuSlice";
import orderHistory from "features/OrderHistory/orderHistorySlice";
import orderSummary from "features/OrderSummary/orderSummarySlice";
import orderRules from "features/ManageOrderRules/orderRuleSlice";

//apply reducers here
const rootReducer = combineReducers({
    account,
    indicator,
    hub,
    manageMenu,
    order,
    menu,
    orderHistory,
    orderSummary,
    orderRules
});

function configureAppStore(preloadedState) {
estore    const middleware = [...getDefaultMiddleware()];
    const enhancers = [];

    if (process.env.NODE_ENV !== "production") {
        middleware.push(loggerMiddleware);
        enhancers.push(monitorReducersEnhancer);
    }

    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware,
        enhancers
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
