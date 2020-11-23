import { Paper } from "@material-ui/core";
import { EMPTY_OBJECT } from "common";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchOrderRules } from "./orderRuleSlice";
import SingleRule from "./SingleRule";
import AddNewRule from "./AddNewRule";
import useRuleStyles from "./useRuleStyles";
import { getLoading } from "app/Indicator/indicatorSlice";
import { Skeleton } from "@material-ui/lab";

const LoadingSkeleton = ({ classes }) =>
    Array(4)
        .fill()
        .map((_, i) => (
            <Skeleton key={i} variant="rect" width="100%" animation="wave" height="62px" className={classes.skeleton} />
        ));

const ManageRules = ({ setHeader }) => {
    const classes = useRuleStyles();
    const dispatch = useDispatch();
    const rules = useSelector(state => state.orderRules) || EMPTY_OBJECT;
    const loading = useSelector(getLoading("orderRules"));

    React.useEffect(() => {
        setHeader({ title: "Manage Menu" });
        dispatch(handleFetchOrderRules);
    }, [dispatch, setHeader]);

    return (
        <Paper className={classes.root}>
            {loading ? (
                <LoadingSkeleton classes={classes} />
            ) : (
                <>
                    {" "}
                    <AddNewRule rules={rules} />
                    {Object.entries(rules).map(([ruleName, rule]) => (
                        <SingleRule key={ruleName} classes={classes} rule={rule} />
                    ))}
                </>
            )}
        </Paper>
    );
};

export default ManageRules;
