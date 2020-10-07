import React from "react";
import { getAccountToken } from "app/Account/accountSlice";
import Home from "features/Home";
import { useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import Unauthorized from "./Unauthorized";
/**
 * From https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
export default () => {
    const isLogin = useSelector(getAccountToken);
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/unauthorized" exact component={Unauthorized} />
            <PrivateRoute path="/management" exact component={Home} isLogin={isLogin} />
        </Switch>
    );
};

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => (
    <Route
        {...rest}
        render={props => (isLogin ? <Component {...props} /> : <Redirect to="/unauthorized" />)}
    />
);
