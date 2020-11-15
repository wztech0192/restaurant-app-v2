import React from "react";
import { Router } from "react-router-dom";
import history from "app/history";
import Header from "./Header";
import AccountViewModal from "features/Account/AccountViewModal";
import Routes from "./Routes";
import Notifier from "app/Indicator/Notifier";
import GlobalModal from "app/Indicator/GlobalModal";
import { handleLoadLocalAccount } from "features/Account/accountSlice";
import { useDispatch } from "react-redux";
import { handleStartOrderHub } from "app/centralHub";
import GlobalLoading from "app/Indicator/GlobalLoading";
import { EMPTY_OBJECT } from "common";

const Layout = () => {
    const dispatch = useDispatch();

    const [header, setHeader] = React.useState(EMPTY_OBJECT);

    React.useEffect(() => {
        dispatch(handleLoadLocalAccount);
        dispatch(handleStartOrderHub);
    }, [dispatch]);

    return (
        <Router history={history}>
            <Header header={header} />
            <AccountViewModal />
            <Routes setHeader={setHeader} />
            <Notifier />
            <GlobalModal />
            <GlobalLoading />
        </Router>
    );
};

export default Layout;
