import { MenuItem, TextField, Typography } from "@material-ui/core";
import React from "react";
import { editedItemSelectOption } from "../slices/orderSlice";

const OptionSelectField = ({
    options,
    selectedOption = {},
    groupName,
    selectedKey,
    dispatch,
    optionPriceMultiplier = 1
}) => {
    if (!options) return null;
    return (
        <>
            <TextField
                fullWidth
                select
                variant="outlined"
                required
                label={`SELECT A ${groupName.toUpperCase()}`}
                value={selectedOption.name || ""}
                onChange={e =>
                    dispatch(
                        editedItemSelectOption({
                            selectedKey,
                            groupName,
                            option: options.find(opt => opt.name === e.target.value)
                        })
                    )
                }
            >
                {options.map(opt => (
                    <MenuItem key={opt.id} value={opt.name}>
                        <Typography component="h2" className="full-width">
                            {opt.name}
                            {Boolean(opt.price) && (
                                <span className="float-right">
                                    {(opt.price * optionPriceMultiplier).toFixed(2)}
                                </span>
                            )}
                        </Typography>
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <br />
        </>
    );
};

export default OptionSelectField;
