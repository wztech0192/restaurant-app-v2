import React from "react";
import { Router } from "react-router-dom";
import history from "app/history";
import Header from "./Header";
import AccountViewModal from "app/Account/AccountViewModal";
import Routes from "./Routes";
import Notifier from "app/Indicator/Notifier";
import GlobalModal from "app/Indicator/GlobalModal";
import { handleLoadLocalAccount } from "app/Account/accountSlice";
import { useDispatch } from "react-redux";
import { handleStartOrderHub } from "app/signalRHubs/ordersHub";
import GlobalLoading from "app/Indicator/GlobalLoading";

const Layout = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = React.useState("");

    React.useEffect(() => {
        dispatch(handleLoadLocalAccount);
        dispatch(handleStartOrderHub);
    }, [dispatch]);

    return (
        <Router history={history}>
            <Header title={title} />
            <AccountViewModal />
            <Routes setTitle={setTitle} />
            <Notifier />
            <GlobalModal />
            <GlobalLoading />
        </Router>
    );
};

export default Layout;
