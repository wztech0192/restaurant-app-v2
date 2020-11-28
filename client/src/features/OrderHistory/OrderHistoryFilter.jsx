import { Chip, Grid, MenuItem, Paper, Tab, Tabs, TextField } from "@material-ui/core";
import { EMPTY_ARRAY } from "common";
import DateRangeSelector from "common/components/DateRangeSelector";
import OrderStatus, {
    AllStatus,
    getOrderStatusDisplay,
    getStatusChipProps,
    OnlyPending
} from "features/OrderHistory/orderStatus";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "./orderHistorySlice";
import moment from "moment";

const chips = {
    display: "flex",
    flexWrap: "wrap"
};
const chipStyle = { marginRight: 2 };
const SelectProps = {
    MenuProps: {
        getContentAnchorEl: () => null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        }
    },
    multiple: true,
    renderValue: selected => (
        <div style={chips}>
            {selected.map(i => (
                <Chip
                    {...getStatusChipProps(i)}
                    key={i}
                    size="small"
                    label={getOrderStatusDisplay(i)}
                    style={chipStyle}
                />
            ))}
        </div>
    )
};

const OrderFilter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.orderHistory.filter);
    const [tab, setTab] = React.useState(0);
    /* const handleSetFilter = newFilter => {
        localStorage.setItem("manageOrderFilter", JSON.stringify(newFilter));
        setFilter(newFilter);
    };*/
    return (
        <Paper>
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="simple tabs example"
                onChange={(e, newVal) => {
                    setTab(newVal);
                    const today = moment().format("MM/DD/YYYY");
                    const dateRange = [today, today];
                    if (newVal === 0) {
                        dispatch(updateFilter({ dateRange, status: OnlyPending }));
                    } else if (newVal === 1) {
                        dispatch(updateFilter({ dateRange, status: AllStatus }));
                    }
                }}
            >
                <Tab label="Pending" />
                <Tab label="Today" />
                <Tab label="Filter" />
            </Tabs>
            {tab === 2 && (
                <Grid container alignItems="center" style={{ padding: 10 }} spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <DateRangeSelector
                            label="Date Range"
                            margin="dense"
                            variant="outlined"
                            onChange={dateRange => {
                                dispatch(updateFilter({ dateRange }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="dense"
                            select
                            variant="outlined"
                            label="Status"
                            name="status"
                            value={filter.status || EMPTY_ARRAY}
                            onChange={e => {
                                dispatch(updateFilter({ status: e.target.value }));
                            }}
                            SelectProps={SelectProps}
                        >
                            {Object.entries(OrderStatus).map(([display, value]) => (
                                <MenuItem key={value} value={value}>
                                    {display}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

export default React.memo(OrderFilter);
