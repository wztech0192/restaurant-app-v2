import { createSlice } from "@reduxjs/toolkit";
import { deleteOrderRules, getOrderRules, postOrderRule } from "app/apiProvider";
import { enqueueSnackbar } from "app/Indicator/indicatorSlice";
import { asyncAction } from "app/sharedActions";
import { EMPTY_OBJECT } from "common";
import { getAccountRole } from "features/Account/accountSlice";
import { isManager } from "features/Account/roleChecker";

const initialState = null;

const slice = createSlice({
    name: "orderRules",
    initialState,
    reducers: {
        fetchOrderRules(_, { payload: rules }) {
            return rules;
        },
        addRule(state, { payload: newRule }) {
            state[newRule.name.toLowerCase()] = newRule;
        },
        removeRule(state, { payload: ruleName }) {
            delete state[ruleName.toLowerCase()];
        },
        updateRule(state, { payload: rule }) {
            state[rule.name.toLowerCase()] = rule;
        }
    }
});

export default slice.reducer;

const { fetchOrderRules, addRule, updateRule, removeRule } = slice.actions;

export const handleFetchOrderRules = (dispatch, getState) => {
    if (!getState().orderRules) {
        dispatch(
            asyncAction({
                toggleLoadingFor: "orderRules",
                promise: getOrderRules,
                success: data => {
                    dispatch(fetchOrderRules(data || EMPTY_OBJECT));
                }
            })
        );
    }
};

export const handleAddRule = (newRuleName, onSuccess) => dispatch => e => {
    dispatch(
        asyncAction({
            toggleLoadingFor: "addNewRule",
            promise: () => postOrderRule({ name: newRuleName, activeTarget: true }),
            success: data => {
                dispatch(
                    enqueueSnackbar({
                        message: `Rule ${newRuleName} added`,
                        variant: "success"
                    })
                );
                dispatch(addRule(data));
                if (onSuccess) onSuccess();
            }
        })
    );
};

export const handleRemoveRule = ruleName => dispatch => e => {
    dispatch(
        asyncAction({
            toggleLoadingFor: `rule-${ruleName}`,
            promise: () => deleteOrderRules(ruleName),
            success: () => {
                dispatch(removeRule(ruleName));
                dispatch(
                    enqueueSnackbar({
                        message: `Rule ${ruleName} removed`,
                        variant: "info"
                    })
                );
            }
        })
    );
};

export const handleUpdateRuleMetadata = rule => dispatch => (name, value) => {
    const newRule = {
        ...rule,
        [name]: value
    };
    dispatch(
        asyncAction({
            toggleLoadingFor: `rule-${rule.name}`,
            promise: () => postOrderRule(newRule),
            success: data => {
                dispatch(updateRule(data));
            }
        })
    );
};

/**Client receivers */
const UPDATE_ORDER_RULES = "UpdateOrderRules";

export const orderRulesHubMiddleware = (dispatch, getState) => {
    return {
        [UPDATE_ORDER_RULES]: rules => {
            if (!isManager(getAccountRole(getState()))) dispatch(fetchOrderRules(rules));
        }
    };
};
