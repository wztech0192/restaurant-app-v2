import React from "react";
import { List } from "@material-ui/core";
import useStyles from "../useStyles";
import { useDispatch } from "react-redux";
import MenuItemSingle from "./MenuItemSingle";

const MenuItemList = ({ menuEntry }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <List dense disablePadding className={classes.foodGroup}>
            {menuEntry.menuItems.map(menuItem => (
                <MenuItemSingle key={menuItem.name} menuEntry={menuEntry} menuItem={menuItem} />
            ))}
        </List>
    );
};

export default MenuItemList;
