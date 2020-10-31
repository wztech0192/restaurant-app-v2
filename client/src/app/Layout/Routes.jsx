import React from "react";
import { getAccountRole, getAccountToken } from "app/Account/accountSlice";
import CustomerMain from "features/CustomerMain";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import { isManager } from "app/Account/roleChecker";
import ManagerTabs from "./ManagerTabs";
import ManageMenu from "features/ManageMenu";
import ManageOrders from "features/ManageOrders";
import OrderMenu from "features/OrderMenu";
import { Container, makeStyles } from "@material-ui/core";
/**
 * From https://tylermcginnis.com/react-router-protected-routes-authentication/
 */

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.mixins.toolbar.minHeight + 30,
        marginBottom: theme.mixins.toolbar.minHeight
    }
}));
export default () => {
    const classes = useStyles();

    const isLogin = useSelector(getAccountToken);
    const role = useSelector(getAccountRole);
    const manager = isManager(role);

    const isAuthorized = isLogin && manager;
    return (
        <Container className={classes.root} maxWidth="md">
            <Switch>
                <Route path="/" exact component={CustomerMain} />
                <Route path="/order" exact component={OrderMenu} />
                <PrivateRoute
                    path="/manage/menu"
                    exact
                    component={ManageMenu}
                    isAuthorized={isAuthorized}
                />
                <PrivateRoute
                    path="/manage/orders"
                    exact
                    component={ManageOrders}
                    isAuthorized={isAuthorized}
                />
                <PrivateRoute
                    path="/manage/status"
                    exact
                    component={CustomerMain}
                    isAuthorized={isAuthorized}
                />
            </Switch>
            {isAuthorized && <ManagerTabs />}
        </Container>
    );
};

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => (
    <Route
        {...rest}
        render={props => (isAuthorized ? <Component {...props} /> : <Unauthorized />)}
    />
);
