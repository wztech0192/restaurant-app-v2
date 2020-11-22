import React from "react";
import { Typography, Chip } from "@material-ui/core";
import { getQuantity } from "../slices/orderSlice";
import { useSelector } from "react-redux";
import { validateRule } from "features/ManageOrderRules/ruleValidator";

const MenuEntryTitle = ({ menuEntry, variant = "h6" }) => {
    const orderRules = useSelector(state => state.orderRules);
    const isRuleValid = validateRule(orderRules, menuEntry.name);

    const quantity = useSelector(getQuantity(menuEntry.name));
    return (
        <Typography variant={variant} component="h2" className="full-width">
            <b>{menuEntry.name}</b>
            {!isRuleValid ? (
                <Chip color="secondary" label="Unavailable" className="float-right margin-top-5" size="small" />
            ) : (
                quantity > 0 && (
                    <Chip
                        component="span"
                        className="float-right margin-top-5"
                        color="primary"
                        label={quantity}
                        size="small"
                    />
                )
            )}
        </Typography>
    );
};

export default MenuEntryTitle;
