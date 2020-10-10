import React from "react";
import { Provider } from "react-redux";
import Header from "./Layout/Header";
import Routes from "./Layout/Routes";
import store from "./store";
import "fontsource-roboto";
import { Router } from "react-router-dom";
import history from "./history";
import { Fade, ThemeProvider } from "@material-ui/core";
import NotistackProvider from "../common/NotistackProvider";
import theme from "app/theme";
import GlobalModal from "./Indicator/GlobalModal";
import AccountViewModal from "./Account/AccountViewModal";
import Notifier from "./Indicator/Notifier";

const App = () => {
    return (
        <Fade in>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <NotistackProvider>
                        <Router history={history}>
                            <Header />
                            <AccountViewModal />
                            <Routes />
                            <Notifier />
                            <GlobalModal />
                        </Router>
                    </NotistackProvider>
                </ThemeProvider>
            </Provider>
        </Fade>
    );
};

export default App;
