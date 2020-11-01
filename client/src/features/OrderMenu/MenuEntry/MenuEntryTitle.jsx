import React from "react";
import { Typography, Chip } from "@material-ui/core";

const MenuEntryTitle = ({ menuEntry, variant = "h6" }) => {
    return (
        <Typography variant={variant} component="h2" className="full-width">
            <span>{menuEntry.name}</span>
            <Chip component="span" className="float-right margin-top-5" color="primary" label={4} size="small" />
        </Typography>
    );
};

export default MenuEntryTitle;
