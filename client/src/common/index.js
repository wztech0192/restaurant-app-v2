import moment from "moment";

export const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getDateStr = date => {
    var m = date ? moment(date) : moment();
    return m.format("MM/DD/YYYY hh:mm a");
};

export const shallowReplace = (state, replaceState) => {
    for (let key in state) {
        state[key] = replaceState[key];
    }
};

export const prettyJsonStringify = obj => JSON.stringify(obj, null, 4);

export const propCompare = keys => (prev, next) => {
    for (let key of keys) {
        if (prev[key] !== next[key]) {
            return false;
        }
    }
    return true;
};

export const phoneNum = "(803)226-0689";

export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};

export const parseLocalStorageOrDefault = (name, defaultItem) => {
    try {
        return JSON.parse(localStorage.getItem(name)) || defaultItem;
    } catch {
        return defaultItem;
    }
};
export const DayOptions = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

export const calcTotal = ({ tax, price, tip }) => {
    const taxedTotal = price * tax;
    return taxedTotal + price + tip;
};

export const validateOrderFilter = (filter, order) => {
    return (
        (filter.status.length <= 0 || filter.status.includes(order.status)) &&
        moment(order.createdOn).isBetween(
            moment(filter.dateRange[0]),
            moment(filter.dateRange[1]).add(1, "day").subtract(1, "seconds")
        )
    );
};
