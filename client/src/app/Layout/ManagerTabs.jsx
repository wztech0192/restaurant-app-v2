import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        bottom: 0,
        position: "fixed",
        width: "100%",
        left: 0
    }
});

const routes = [
    {
        to: "/manage/orders",
        label: "Orders"
    },
    {
        to: "/manage/rules",
        label: "Rules"
    },
    {
        to: "/manage/menu",
        label: "Menu"
    },
    {
        to: "/order",
        label: "Make Order"
    }
];

const ManagerTabs = () => {
    const classes = useStyles();

    const location = useLocation();
    const [state, setState] = React.useState(0);

    React.useEffect(() => {
        setState(routes.findIndex(r => location.pathname.includes(r.to)));
    }, [location.pathname]);

    return (
        <Paper square elevation={6} className={classes.root}>
            <Tabs
                value={state}
                centered
                indicatorColor="primary"
                onChange={(e, tabVal) => setState(tabVal)}
                textColor="primary"
            >
                {routes.map(route => (
                    <Tab key={route.to} {...route} component={Link} />
                ))}
            </Tabs>
        </Paper>
    );
};

export default ManagerTabs;
