import React from "react";
import { Provider } from "react-redux";
import Header from "./Layout/Header";
import Routes from "./Layout/Routes";
import store from "./store";
import "fontsource-roboto";
import { Router } from "react-router-dom";
import history from "./history";
import { ThemeProvider } from "@material-ui/core";
import NotistackProvider from "./NotistackProvider";
import theme from "app/theme";

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <NotistackProvider>
                    <Router history={history}>
                        <Header />
                        <Routes />
                    </Router>
                </NotistackProvider>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
