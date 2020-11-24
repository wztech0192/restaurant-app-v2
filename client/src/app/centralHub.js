import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createSlice } from "@reduxjs/toolkit";
import { orderRulesHubMiddleware } from "features/ManageOrderRules/orderRuleSlice";
import { orderHistoryHubMiddleware } from "features/OrderHistory/orderHistorySlice";

const hubMiddalewares = [orderHistoryHubMiddleware, orderRulesHubMiddleware];

const url = process.env.REACT_APP_API_URL + "/orders";

const connection = new HubConnectionBuilder().withUrl(url).configureLogging(LogLevel.Information).build();

const initialState = {
    connected: true,
    init: false,
    orders: [],
    activeMenuId: 0
};

const orderHubSlice = createSlice({
    name: "hub",
    initialState,
    reducers: {
        connect(state, { payload }) {
            state.connected = payload;
            state.init = true;
        }
    }
});

export default orderHubSlice.reducer;

const { connect } = orderHubSlice.actions;

export const checkIsOrderHubConnected = state => state.hub.connected;
export const checkIsOrderHubInitConnected = state => state.hub.connected && state.hub.init;

export const invoke = (name, ...args) => {
    connection.invoke(name, ...args);
};

export const joinHubGroup = token => {
    invoke("JoinGroup", token);
};

export const handleStartOrderHub = (dispatch, getState) => {
    const start = async () => {
        try {
            console.log("connecting....");
            await connection.start();
            dispatch(connect(true));
        } catch (err) {
            dispatch(connect(false));
            console.log("connection failed, try to reconnect in 5 second....");
            setTimeout(start, 5000);
        }
    };

    connection.onreconnected(() => {
        console.log("reconnected....");
        dispatch(connect(true));
    });

    connection.onreconnecting(error => {
        dispatch(connect(false));
        console.log(`Connection lost due to error "${error}". Reconnecting.`);
    });

    connection.onclose(() => {
        console.log("closed, try to reconnect in 2 second....");
        dispatch(connect(false));
        setTimeout(start, 2000);
    });

    for (let middleware of hubMiddalewares) {
        const receivers = middleware(dispatch, getState, invoke);
        if (receivers)
            for (let key in receivers) {
                connection.on(key, receivers[key]);
            }
    }
    start();
};
