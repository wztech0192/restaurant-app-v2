import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Radio
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { EMPTY_ARRAY, EMPTY_OBJECT, propCompare } from "common";
import React from "react";

const listStyle = { width: "100%" };
const CardList = ({ account = EMPTY_OBJECT, onSelect, useCardId, onRemove, canEdit }) => {
    const { cards = EMPTY_ARRAY, defaultCardId } = account;

    if (!useCardId) {
        useCardId = defaultCardId;
    }
    return (
        <List style={listStyle}>
            {cards.map(card => (
                <ListItem dense key={card.id}>
                    <ListItemIcon>
                        <Radio
                            disabled={!canEdit}
                            color="primary"
                            checked={useCardId === card.id}
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

const propList = ["account", "useCardId", "canEdit"];
export default React.memo(CardList, propCompare(propList));
