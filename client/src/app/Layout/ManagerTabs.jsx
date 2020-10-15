import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        bottom: 0,
        position: "absolute",
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
        to: "/manage/status",
        label: "Status"
    },
    {
        to: "/manage/menu",
        label: "Menu"
    }
];

const ManagerTabs = () => {
    const classes = useStyles();

    const location = useLocation();
    const [state, setState] = React.useState(() => {
        const index = routes.findIndex(r => r.to === location.pathname);
        if (index === -1) {
            return 0;
        }
        return index;
    });

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
