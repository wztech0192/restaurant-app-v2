import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Popover from "@material-ui/core/Popover";
import { Grid, TextField, MenuItem } from "@material-ui/core";

const format = "MM/DD/YYYY";

const useStyles = makeStyles({
    root: {
        position: "relative"
    },
    calender: {
        display: "none"
    },
    popperRoot: {
        "& .flatpickr-calendar": {
            top: "0 !important",
            overflow: "hidden !important"
        }
    }
});

const rangeOptions = {
    Today: () => {
        const start = moment();
        return [start, start];
    },
    "This Week": () => [moment().startOf("week"), moment().endOf("week")],
    "Last 7 Days": () => [moment().subtract(6, "days"), moment()],
    "This Month": () => [moment().startOf("month"), moment().endOf("month")],
    "Last 30 Days": () => [moment().subtract(29, "days"), moment()],
    "This Year": () => [moment().startOf("year"), moment().endOf("year")],
    "Last Year": () => {
        const start = moment().subtract(1, "years").startOf("year");
        const end = start.clone().endOf("year");
        return [start, end];
    }
};

const defaultRange = rangeOptions.Today();
const initialState = {
    range: defaultRange,
    selected: "Today",
    open: false
};

const DateRangeSelector = ({ onChange, defaultValue, ...props }) => {
    const classes = useStyles();
    const [state, setState] = React.useState(initialState);
    const anchorEl = React.useRef();

    const toggleMenu = () => {
        setState({ ...state, open: !state.open });
    };

    const onCalenderSelect = range => {
        if (range.length > 1) {
            const formattedRange = [moment(range[0], format).format(format), moment(range[1], format).format(format)];
            setState({
                range: formattedRange,
                selected: "Customize Range",
                label: `${formattedRange[0]} - ${formattedRange[1]}`,
                open: false
            });
            onChange(formattedRange, "Customize Range");
        }
    };

    const rangeChange = e => {
        const selected = e.target.textContent;
        const range = rangeOptions[selected]();
        range[0] = range[0].format(format);
        range[1] = range[1].format(format);
        if (range) {
            setState({
                range,
                selected,
                open: false
            });
            onChange(range, selected);
        }
    };

    return (
        <div className={classes.root}>
            <TextField
                ref={anchorEl}
                {...props}
                value={state.label || state.selected}
                onClick={toggleMenu}
                InputProps={{ readOnly: true }}
                inputProps={{ style: { cursor: "pointer" } }}
                fullWidth
            />
            <Popover
                open={state.open}
                anchorEl={anchorEl.current}
                onClose={toggleMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <Grid container className={classes.popperRoot}>
                    <Grid item>
                        {Object.keys(rangeOptions).map((val, i) => (
                            <MenuItem selected={val === state.selected} value={val} key={i} onClick={rangeChange}>
                                {val}
                            </MenuItem>
                        ))}
                    </Grid>
                    <Grid item>
                        <Flatpickr
                            className={classes.calender}
                            options={{
                                mode: "range",
                                dateFormat: "m/d/Y",
                                inline: true,
                                defaultDate: state.range
                            }}
                            onChange={onCalenderSelect}
                        />
                    </Grid>
                </Grid>
            </Popover>
        </div>
    );
};

export default DateRangeSelector;
