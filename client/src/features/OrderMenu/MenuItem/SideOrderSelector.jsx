import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Chip,
    makeStyles,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import React from "react";
import { editedItemSelectOption } from "../slices/orderSlice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
    root: {
        "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: "12px 0 !important"
        },
        "& .MuiAccordionDetails-root": {
            padding: "0px 16px 0px !important"
        }
    },
    chip: {
        margin: 2
    }
});

const SideOrderSelector = ({
    options,
    selectedOption = {},
    groupName,
    selectedKey,
    dispatch,
    sideOrders,
    defaultExpanded
}) => {
    const classes = useStyles();
    const [adjustQuantity, setAdjustQuantity] = React.useState(1);
    return (
        <Accordion defaultExpanded={defaultExpanded} className={classes.root}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>SIDES</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <span>
                    {sideOrders.map(sideOrder => {
                        return (
                            <Chip
                                size="small"
                                avatar={<Avatar>1</Avatar>}
                                className={classes.chip}
                                component="span"
                                variant="outlined"
                                key={sideOrder.id}
                                label={`${sideOrder.name}${
                                    sideOrder.price ? " - " + sideOrder.price.toFixed(2) : ""
                                }`}
                            />
                        );
                    })}
                </span>
            </AccordionDetails>
            <AccordionActions>
                <Button
                    size="small"
                    color="primary"
                    variant={adjustQuantity > 0 ? "contained" : "text"}
                    onClick={e => setAdjustQuantity(1)}
                >
                    Add
                </Button>{" "}
                <Button
                    size="small"
                    color="secondary"
                    onClick={e => setAdjustQuantity(-1)}
                    variant={adjustQuantity < 0 ? "contained" : "text"}
                >
                    Remove
                </Button>
            </AccordionActions>
        </Accordion>
    );
};

export default SideOrderSelector;
