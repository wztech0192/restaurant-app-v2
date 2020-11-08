import { Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { EMPTY_ARRAY } from "common";

const reduceSideTotal = (total, [_, opt]) => {
    if (opt.price > 0) {
        total -= opt.price * opt.quantity;
    }
    return total;
};

const OrderItemsSummary = ({ handleRemoveOrder, handleEditOrder, canEdit, orderedItems, classes }) => {
    return (
        <List className={classes.itemsContainer}>
            {orderedItems.map(item => {
                const sides = item.orderedOptions ? Object.entries(item.orderedOptions) : EMPTY_ARRAY;
                const noSideTotal = sides.reduce(reduceSideTotal, item.total);
                console.log(noSideTotal);
                return (
                    <ListItem key={item.uid} dense className={classes.itemList}>
                        {canEdit && (
                            <ListItemAvatar>
                                <div>
                                    {handleEditOrder && (
                                        <IconButton size="small" color="primary" onClick={() => handleEditOrder(item)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    {handleRemoveOrder && (
                                        <IconButton size="small" onClick={() => handleRemoveOrder(item)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </div>
                            </ListItemAvatar>
                        )}
                        <ListItemText
                            primary={
                                <Typography color={false ? "error" : "textPrimary"}>
                                    &nbsp;
                                    <Chip label={item.quantity} component="span" color="primary" size="small" />
                                    &nbsp;&nbsp;
                                    {item.name}
                                    <span className="float-right">{(noSideTotal * item.quantity).toFixed(2)}</span>
                                </Typography>
                            }
                            secondary={
                                <>
                                    {sides.map(([key, opt]) =>
                                        Array(opt.quantity)
                                            .fill()
                                            .map((_, i) => (
                                                <Typography
                                                    component="span"
                                                    key={key + i}
                                                    color={false ? "error" : "textSecondary"}
                                                    className={classes.itemOptionSummary}
                                                >
                                                    {opt.name}
                                                    {opt.price > 0 && (
                                                        <span className="float-right">
                                                            {(item.quantity * opt.price).toFixed(2)}
                                                        </span>
                                                    )}
                                                </Typography>
                                            ))
                                    )}
                                    {item.additionalRequest && (
                                        <Typography
                                            component="span"
                                            color="textSecondary"
                                            className={classes.itemOptionSummary}
                                        >
                                            {item.additionalRequest}
                                        </Typography>
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default React.memo(OrderItemsSummary);
