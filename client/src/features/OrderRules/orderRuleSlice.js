import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rules: null,
    newRule: {}
};

const slice = createSlice({
    name: "orderRules",
    initialState,
    reducers: {
        fetchOrderRules(state, { payload: rules }) {
            state.rules = rules;
        },
        addRule(state, { payload: ruleName }) {
            state.rules[ruleName] = {
                name: ruleName,
                activeTarget: true,
                activeTimes: []
            };
        },
        removeRule(state, { payload: ruleName }) {
            delete state.rules[ruleName];
        },
        updateRuleMetadata(state, { payload }) {
            const { ruleName, name, value } = payload;
            state.rules[ruleName][name] = value;
        }
    }
});

export default slice.reducer;

const { fetchOrderRules, addRule, updateRuleMetadata, removeRule } = slice.actions;
export { addRule, removeRule };

export const handleFetchOrderRules = (dispatch, getState) => {
    if (!getState().orderRules.rules) {
        dispatch(fetchOrderRules({}));
    }
};

export const handleUpdateRuleMetadata = ruleName => dispatch => (name, value) => {
    dispatch(updateRuleMetadata({ ruleName, value, name }));
};
