import Home from "features/Home";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Unauthorized from "./Unauthorized";
/**
 * From https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/unauthorized" exact component={Unauthorized} />
        </Switch>
    );
};

const PrivateRoute = ({ component: Component, authStatus, ...rest }) => (
    <Route
        {...rest}
        render={props => (authStatus ? <Component {...props} /> : <Redirect to="/unauthorized" />)}
    />
);
