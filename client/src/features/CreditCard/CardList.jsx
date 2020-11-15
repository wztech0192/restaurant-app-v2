import {
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Radio,
    RadioGroup
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "common";
import React from "react";

const listStyle = { width: "100%" };
const CardList = ({ account = EMPTY_OBJECT, onSelect, onRemove, canEdit }) => {
    const { cards = EMPTY_ARRAY, defaultCardId } = account;
    return (
        <List style={listStyle}>
            {cards.map(card => (
                <ListItem dense key={card.id}>
                    <ListItemIcon>
                        <Radio
                            disabled={!canEdit}
                            color="primary"
                            checked={defaultCardId === card.id}
                            onClick={() => onSelect(card.id)}
                        />
                    </ListItemIcon>
                    <ListItemText primary={`Card End With ${card.lastFourDigit}`} />
                    {onRemove && (
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={e => onRemove(card.id)}
                                color="secondary"
                                edge="end"
                                aria-label="comments"
                            >
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default CardList;
