import { Grid, IconButton, MenuItem, TextField } from "@material-ui/core";
import { DayOptions, propCompare } from "common";
import React from "react";
import RemoveIcon from "@material-ui/icons/Delete";

const timeProp = {
    InputLabelProps: {
        shrink: true
    },
    inputProps: {
        step: 300
    },
    onKeyDown: e => e.preventDefault()
};

const TimeRangeSelector = ({ timeRule, onChange, loading, onRemove }) => {
    const [state, setState] = React.useState(timeRule);
    React.useEffect(() => {
        if (state !== timeRule) {
            setState(timeRule);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRule]);

    const { daysOfWeek, start, stop } = state;

    const handleOnChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const handleTriggerOnChange = () => {
        onChange(state);
    };

    return (
        <Grid container spacing={2} justify="flex-start" alignItems="center">
            <Grid item xs={12} sm={5}>
                <TextField
                    fullWidth
                    select
                    disabled={loading}
                    label="Days of Week"
                    name="daysOfWeek"
                    value={daysOfWeek}
                    onChange={handleOnChange}
                    SelectProps={{
                        MenuProps: {
                            getContentAnchorEl: () => null
                        },
                        multiple: true,
                        renderValue: selected => selected.map(i => DayOptions[i]).join(", "),
                        onClose: handleTriggerOnChange
                    }}
                >
                    {DayOptions.map((name, i) => (
                        <MenuItem key={i} value={i}>
                            {name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={5} sm={3}>
                <TextField
                    {...timeProp}
                    disabled={loading}
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={start}
                    name="start"
                    onBlur={handleTriggerOnChange}
                    onChange={handleOnChange}
                />
            </Grid>
            <Grid item xs={5} sm={3}>
                <TextField
                    fullWidth
                    disabled={loading}
                    label="Stop Time"
                    type="time"
                    {...timeProp}
                    value={stop}
                    name="stop"
                    onBlur={handleTriggerOnChange}
                    onChange={handleOnChange}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton color="secondary" disabled={loading} onClick={onRemove}>
                    <RemoveIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

const propsKeys = ["timeRule", "loading"];
export default React.memo(TimeRangeSelector, propCompare(propsKeys));
