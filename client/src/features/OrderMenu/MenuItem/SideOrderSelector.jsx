import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Badge,
    Button,
    ButtonGroup,
    Chip,
    makeStyles,
    Typography
} from "@material-ui/core";
import React from "react";
import { editedItemSelectOption } from "../slices/orderSlice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import { EMPTY_OBJECT } from "common";

const useBadeStyles = makeStyles({
    badge: { width: 14, height: 14, minWidth: 14, transform: "scale(1) translate(20%, -10%)" }
});
const useStyles = makeStyles({
    root: {
        marginTop: 8,
        "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: "0px !important"
        },
        "& .MuiAccordionDetails-root": {
            padding: "0px !important"
        },
        "& .MuiAccordionSummary-root.Mui-expanded": {
            minHeight: "auto"
        }
    },

    chip: {
        margin: 2
    }
});

const SideOrderSelector = ({
    orderedOptions = EMPTY_OBJECT,
    dispatch,
    sideOrders,
    defaultExpanded
}) => {
    const badgeClasses = useBadeStyles();
    const classes = useStyles();
    const [editQuantity, setEditQuantity] = React.useState(1);
    return (
        <Accordion elevation={5} defaultExpanded={defaultExpanded} className={classes.root}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>SIDES</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <span>
                    {sideOrders.map(sideOrder => {
                        const selected = orderedOptions[sideOrder.name];
                        const selectedQuantity = selected ? selected.quantity : 0;
                        return (
                            <Badge
                                key={sideOrder.id}
                                badgeContent={sideOrder.price ? selectedQuantity : 0}
                                color="primary"
                                classes={badgeClasses}
                            >
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    color={selectedQuantity ? "primary" : "default"}
                                    className={classes.chip}
                                    component="span"
                                    label={`${sideOrder.name}${
                                        sideOrder.price ? ` (${sideOrder.price.toFixed(2)})` : ""
                                    }`}
                                    onClick={e => {
                                        const tempEditQuantity = sideOrder.price
                                            ? editQuantity
                                            : selectedQuantity <= 0
                                            ? 1
                                            : -1;
                                        if (tempEditQuantity > 0 || selectedQuantity > 0)
                                            dispatch(
                                                editedItemSelectOption({
                                                    selectedKey: sideOrder.name,
                                                    groupName: sideOrder.name,
                                                    option: sideOrder,
                                                    editQuantity: tempEditQuantity
                                                })
                                            );
                                    }}
                                />
                            </Badge>
                        );
                    })}
                </span>
            </AccordionDetails>
            <AccordionActions>
                <ButtonGroup size="small">
                    <Button
                        color="primary"
                        variant={editQuantity > 0 ? "contained" : "text"}
                        onClick={e => setEditQuantity(1)}
                    >
                        <AddIcon />
                    </Button>
                    <Button
                        color="secondary"
                        onClick={e => setEditQuantity(-1)}
                        variant={editQuantity < 0 ? "contained" : "text"}
                    >
                        <MinusIcon />
                    </Button>
                </ButtonGroup>
            </AccordionActions>
        </Accordion>
    );
};

export default SideOrderSelector;
