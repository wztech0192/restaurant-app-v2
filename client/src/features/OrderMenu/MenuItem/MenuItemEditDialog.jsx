import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@material-ui/core";
import TextFieldWrapper from "common/TextFieldWrapper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditedItem, setEditedItemMetadata } from "../slices/orderSlice";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import OptionsEditor from "./OptionsEditor";

const MenuitemEditContent = React.memo(
    ({ menu, editedItem, dispatch, handleClose }) => {
        const quantity = editedItem.quantity;
        const cost = editedItem.total * quantity;
        return (
            <div>
                <DialogTitle>
                    {editedItem.name}

                    <span className="float-right">
                        <IconButton
                            size="small"
                            disabled={quantity <= 1}
                            onClick={e => {
                                const newQuantity = quantity - 1;
                                dispatch(
                                    setEditedItemMetadata(
                                        "quantity",
                                        newQuantity > 0 ? newQuantity : 1
                                    )
                                );
                            }}
                        >
                            <MinusIcon />
                        </IconButton>
                        <Chip variant="outlined" size="small" label={quantity} />
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={e => {
                                dispatch(setEditedItemMetadata("quantity", quantity + 1));
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </span>
                </DialogTitle>
                <DialogContent>
                    <OptionsEditor
                        orderedOptions={editedItem.orderedOptions}
                        canAddSides={editedItem.canAddSides}
                        optionGroupNames={editedItem.optionGroupNames}
                        optionPriceMultiplier={editedItem.optionPriceMultiplier}
                        menu={menu}
                    />

                    <TextFieldWrapper
                        multiline
                        variant="standard"
                        value={editedItem.additionalRequest}
                        name="additionalRequest"
                        onChange={e => {
                            dispatch(setEditedItemMetadata(e.target.name, e.target.value));
                        }}
                        margin="dense"
                        label="Additional Request"
                        helperText={
                            editedItem.additionalRequest &&
                            "Some request may require additional charge"
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Box flex="auto" marginLeft="16px">
                        <Typography>
                            <b>${cost.toFixed(2)}</b>
                        </Typography>
                    </Box>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={e => {}} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </div>
        );
    },
    (prev, next) => !next.editedItem
);

const MenuItemEditDialog = ({ menu }) => {
    const dispatch = useDispatch();
    const editedItem = useSelector(state => state.order.editedItem);

    const handleClose = () => {
        dispatch(setEditedItem(false));
    };
    return (
        <Dialog fullWidth open={Boolean(editedItem)} onClose={handleClose}>
            <MenuitemEditContent
                menu={menu}
                editedItem={editedItem}
                handleClose={handleClose}
                dispatch={dispatch}
            />
        </Dialog>
    );
};

export default MenuItemEditDialog;
