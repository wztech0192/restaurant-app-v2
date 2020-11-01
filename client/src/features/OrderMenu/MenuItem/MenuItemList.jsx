import React from "react";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Grow,
    Button,
    IconButton,
    TextField,
    MenuItem,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import useStyles from "../useStyles";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

const MenuItemList = ({ menuEntry }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <List dense disablePadding className={classes.foodGroup}>
            {menuEntry.menuItems.map(item => {
                return (
                    <ListItem key={item.name} divider className={classes.menuItemContainer}>
                        <ListItemText
                            primary={
                                <Typography>
                                    {item.name}
                                    <Typography variant="caption">{item.summary}</Typography>
                                </Typography>
                            }
                            secondary={item.price.toFixed(2)}
                        />
                        <ListItemSecondaryAction className={classes.menuItemActions}>
                            <IconButton
                                size="small"
                                onClick={e => {
                                    /* if (orderedData.length > 0) {
                                        const deletedFoodPayload = {
                                            entreeName: entree.name,
                                            foodName: prefixedName,
                                            foodData: orderedData[orderedData.length - 1]
                                        };
                                        actions.deleteFood(deletedFoodPayload);
                                    }*/
                                }}
                            >
                                <MinusIcon />
                            </IconButton>
                            <Chip variant="outlined" size="small" label={0} />
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={e => {
                                    /*     const payload = {
                                        entreeName: entree.name,
                                        foodName: prefixedName,
                                        foodData: { ...food }
                                    };
                                    actions.setEditFood(payload);*/
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default MenuItemList;
