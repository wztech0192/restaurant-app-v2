import React from "react";
import { Typography, Chip } from "@material-ui/core";
import { getQuantity } from "../slices/orderSlice";
import { useSelector } from "react-redux";

const MenuEntryTitle = ({ menuEntry, variant = "h6" }) => {
    const quantity = useSelector(getQuantity(menuEntry.name));

    return (
        <Typography variant={variant} component="h2" className="full-width">
            <span>{menuEntry.name}</span>
            <Chip
                component="span"
                className="float-right margin-top-5"
                color="primary"
                label={quantity}
                size="small"
            />
        </Typography>
    );
};

export default MenuEntryTitle;
