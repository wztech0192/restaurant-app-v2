import { Badge, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const OrderItemsSummary = ({ handleRemoveOrder, handleEditOrder, canEdit, orderedItems, classes }) => {
    return (
        <List className={classes.itemsContainer}>
            {orderedItems.map(item => {
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
                                    <span className="float-right">{(item.total * item.quantity).toFixed(2)}</span>
                                </Typography>
                            }
                            /*   secondary={getCombinedFoodRequests(singleFood).map((req, i) => (
                        <Typography
                            component="span"
                            key={i}
                            color={unavailable ? "error" : "textSecondary"}
                            className={classes.foodOptions}
                        >
                            {req.name}
                            {req.price && <span className="float-right">{req.price.toFixed(2)}</span>}
                        </Typography>
                    ))}*/
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default React.memo(OrderItemsSummary);
