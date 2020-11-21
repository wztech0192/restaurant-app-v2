import { Checkbox, Grid, ListItemText, MenuItem, TextField } from "@material-ui/core";
import React from "react";

const timeProp = {
    InputLabelProps: {
        shrink: true
    },
    inputProps: {
        step: 300
    },
    onKeyDown: e => e.preventDefault()
};

const DayOptions = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const selectProps = {
    multiple: true,
    renderValue: selected => selected.map(i => DayOptions[i]).join(", ")
};

const TimeRangeSelector = ({ timeRule, onChange }) => {
    const { days, start, stop } = timeRule;
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    select
                    label="Days of Week"
                    name="days"
                    value={days}
                    SelectProps={selectProps}
                    onChange={onChange}
                >
                    {DayOptions.map((name, i) => (
                        <MenuItem key={i} value={i}>
                            <Checkbox color="primary" checked={days.includes(i)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    {...timeProp}
                    label="Start Time"
                    type="time"
                    value={start}
                    name="start"
                    onChange={onChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Stop Time"
                    type="time"
                    {...timeProp}
                    value={stop}
                    name="stop"
                    onChange={onChange}
                />
            </Grid>
        </Grid>
    );
};

export default React.memo(TimeRangeSelector, (prev, next) => prev.timeRule === next.timeRule);
