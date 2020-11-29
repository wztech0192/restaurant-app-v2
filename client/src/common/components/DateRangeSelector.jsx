import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Popover from "@material-ui/core/Popover";
import { Grid, TextField, MenuItem } from "@material-ui/core";

export const format = "MM/DD/YYYY";

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

export const rangeOptions = {
    Today: () => {
        const start = moment().format(format);
        return [start, start];
    },
    "Last 7 Days": () => [moment().subtract(6, "days").format(format), moment().format(format)],
    "Last 30 Days": () => [moment().subtract(29, "days").format(format), moment().format(format)],
    "This Month": () => [
        moment().startOf("month").format(format),
        moment().endOf("month").format(format)
    ],
    "This Year": () => [
        moment().startOf("year").format(format),
        moment().endOf("year").format(format)
    ],
    "Last Year": () => {
        const start = moment().subtract(1, "years").startOf("year");
        const end = start.clone().endOf("year");
        return [start.format(format), end.format(format)];
    }
};

const initialState = {
    range: rangeOptions["Last 7 Days"](),
    selected: "Last 7 Days",
    open: false
};

const DateRangeSelector = ({ onChange, defaultValue, defaultRange, ...props }) => {
    const classes = useStyles();
    const [state, setState] = React.useState(initialState);
    const anchorEl = React.useRef();

    React.useEffect(() => {
        if (defaultRange && state.selected !== defaultRange) {
            rangeChange({ target: { textContent: defaultRange } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultRange]);
    const toggleMenu = () => {
        setState({ ...state, open: !state.open });
    };

    const onCalenderSelect = range => {
        if (range.length > 1) {
            const formattedRange = [
                moment(range[0], format).format(format),
                moment(range[1], format).format(format)
            ];
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
                            <MenuItem
                                selected={val === state.selected}
                                value={val}
                                key={i}
                                onClick={rangeChange}
                            >
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
