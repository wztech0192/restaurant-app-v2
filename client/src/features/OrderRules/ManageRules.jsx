import { Button, IconButton, InputAdornment, makeStyles, Paper } from "@material-ui/core";
import { EMPTY_OBJECT } from "common";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchOrderRules } from "./orderRuleSlice";
import SingleRule from "./SingleRule";
import AddNewRule from "./AddNewRule";
import useRuleStyles from "./useRuleStyles";

const useStyles = useRuleStyles();

const ManageRules = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const rules = useSelector(state => state.orderRules.rules) || EMPTY_OBJECT;

    React.useEffect(() => {
        dispatch(handleFetchOrderRules);
    }, [dispatch]);

    return (
        <Paper className={classes.root}>
            <AddNewRule rules={rules} />
            {Object.entries(rules).map(([ruleName, rule]) => (
                <SingleRule key={ruleName} classes={classes} rule={rule} />
            ))}
        </Paper>
    );
};

export default ManageRules;
