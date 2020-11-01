import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createSlice } from "@reduxjs/toolkit";

const url = process.env.REACT_APP_API_URL + "/orders";

const connection = new HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(LogLevel.Information)
    .build();

const initialState = {
    connected: false,
    orders: [],
    activeMenuId: 0
};

const orderHubSlice = createSlice({
    name: "orderHub",
    initialState,
    reducers: {
        connect(state, { payload }) {
            state.connected = payload;
        }
    }
});

export default orderHubSlice.reducer;

const { connect } = orderHubSlice.actions;

export const checkIsOrderHubConnected = state => state.orderHub.connected;

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

    signalRRegisterCommands(dispatch, getState);
    start();
};

const signalRRegisterCommands = (dispatch, getState) => {
    /* connection.on("IncrementCounter", data => {
       dispatch({ type: "INCREMENT_COUNT" });
        console.log("Count has been incremented");
    });

    connection.on("DecrementCounter", data => {
       dispatch({ type: "DECREMENT_COUNT" });
        console.log("Count has been decremented");
    });*/
};

export const invokeSomething = dispatch => {
    //connection.invoke("IncrementCounter");
};
