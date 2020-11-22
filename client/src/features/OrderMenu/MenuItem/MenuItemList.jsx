import React from "react";
import { List } from "@material-ui/core";
import useStyles from "../useStyles";
import MenuItemSingle from "./MenuItemSingle";

const MenuItemList = ({ menuEntry, orderRules }) => {
    const classes = useStyles();

    return (
        <List dense disablePadding className={classes.foodGroup}>
            {menuEntry.menuItems.map(menuItem => (
                <MenuItemSingle orderRules={orderRules} key={menuItem.name} menuEntry={menuEntry} menuItem={menuItem} />
            ))}
        </List>
    );
};

export default MenuItemList;
