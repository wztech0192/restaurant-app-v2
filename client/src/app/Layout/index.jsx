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
import Connection from "./Connection";
import { EMPTY_OBJECT } from "common";
import TestingWarning from "./TestingWarning";

const Layout = () => {
    const dispatch = useDispatch();

    const [loaded, setLoaded] = React.useState(false);
    const [header, setHeader] = React.useState(EMPTY_OBJECT);

    React.useEffect(() => {
        if (!loaded) {
            dispatch(handleLoadLocalAccount);
            dispatch(handleStartOrderHub);
            setLoaded(true);
        }
    }, [dispatch, loaded]);

    return (
        <Router history={history}>
            <Header header={header} />
            <AccountViewModal />
            {loaded && (
                <>
                    <Routes setHeader={setHeader} />
                    <Connection />
                    <TestingWarning />
                </>
            )}
            <Notifier />
            <GlobalModal />
            <GlobalLoading />
        </Router>
    );
};

export default Layout;
