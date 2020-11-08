import React from "react";
import { getAccountRole } from "app/Account/accountSlice";
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

const routes = [
    {
        path: "/",
        component: CustomerMain
    },
    {
        path: "/order",
        component: OrderMenu
    },
    {
        path: "/manage/menu",
        component: ManageMenu,
        roleCheck: isManager
    },
    {
        path: "/manage/orders",
        component: ManageOrders,
        roleCheck: isManager
    },
    {
        path: "/manage/status",
        component: CustomerMain,
        roleCheck: isManager
    }
];

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.mixins.toolbar.minHeight + 10,
        marginBottom: theme.mixins.toolbar.minHeight
    }
}));

export default ({ setHeader }) => {
    const classes = useStyles();

    const role = useSelector(getAccountRole);
    const manager = isManager(role);

    return (
        <Container className={classes.root} maxWidth="lg">
            <Switch>
                {routes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact
                        render={props => {
                            if (route.roleCheck && !route.roleCheck(role)) {
                                return <Unauthorized />;
                            }
                            return <route.component {...props} setHeader={setHeader} />;
                        }}
                    />
                ))}
            </Switch>
            {manager && <ManagerTabs />}
        </Container>
    );
};
