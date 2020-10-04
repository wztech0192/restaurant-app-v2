import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import monitorReducersEnhancer from "./reduxStuff/monitorReducersEnhancer";
import loggerMiddleware from "./reduxStuff/reduxLogger";

import account from "./Account/accountSlice";

//apply reducers here
const rootReducer = combineReducers({ account });

function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [loggerMiddleware, ...getDefaultMiddleware()],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    });

    return store;
}

export default configureAppStore();
