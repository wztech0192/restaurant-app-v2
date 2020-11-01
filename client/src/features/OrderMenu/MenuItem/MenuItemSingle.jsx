import React from "react";
import {
    Typography,
    Chip,
    IconButton,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import useStyles from "../useStyles";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import { getQuantity, handleAddOrRemoveItem } from "../orderSlice";

const MenuItemSingle = ({ menuEntry, menuItem }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const quantity = useSelector(getQuantity(menuItem.name));

    return (
        <ListItem divider className={classes.menuItemContainer}>
            <ListItemText
                primary={
                    <Typography>
                        {menuItem.name}
                        <Typography variant="caption">{menuItem.summary}</Typography>
                    </Typography>
                }
                secondary={menuItem.price.toFixed(2)}
            />
            <ListItemSecondaryAction className={classes.menuItemActions}>
                <IconButton
                    size="small"
                    disabled={quantity <= 0}
                    onClick={dispatch(handleAddOrRemoveItem(menuEntry, menuItem, -1))}
                >
                    <MinusIcon />
                </IconButton>
                <Chip variant="outlined" size="small" label={quantity} />
                <IconButton
                    size="small"
                    color="primary"
                    onClick={dispatch(handleAddOrRemoveItem(menuEntry, menuItem, 1))}
                >
                    <AddIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default MenuItemSingle;