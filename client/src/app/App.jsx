import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Fade, ThemeProvider } from "@material-ui/core";
import NotistackProvider from "../common/NotistackProvider";
import theme from "app/theme";
import Layout from "./Layout";
import encryptionProvider from "common/encryptionProvider";

encryptionProvider.setPublicKey(process.env.REACT_APP_ENCRYPTION_PUBLIC_KEY);

const App = () => {
    return (
        <Fade in>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <NotistackProvider>
                        <Layout />
                    </NotistackProvider>
                </ThemeProvider>
            </Provider>
        </Fade>
    );
};

export default App;
