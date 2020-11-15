import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createSlice } from "@reduxjs/toolkit";
import orderHubMiddleware from "features/OrderMenu/slices/orderHubMiddleware";

const hubMiddalewares = [orderHubMiddleware];

const url = process.env.REACT_APP_API_URL + "/orders";

const connection = new HubConnectionBuilder().withUrl(url).configureLogging(LogLevel.Information).build();

const initialState = {
    connected: false,
    orders: [],
    activeMenuId: 0
};

const orderHubSlice = createSlice({
    name: "hub",
    initialState,
    reducers: {
        connect(state, { payload }) {
            state.connected = payload;
        }
    }
});

export default orderHubSlice.reducer;

const { connect } = orderHubSlice.actions;

export const checkIsOrderHubConnected = state => state.hub.connected;

export const invoke = (name, ...args) => {
    connection.invoke(name, ...args);
};

export const handleStartOrderHub = (dispatch, getState) => {
    const start = async () => {
        try {
            console.log("connecting....");
            await connection.start();
            dispatch(connect(true));
        } catch (err) {
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
        console.log("closed, try to reconnect in 5 second....");
        dispatch(connect(false));
        setTimeout(start, 5000);
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
