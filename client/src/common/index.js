import moment from "moment";

export const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getDateStr = date => {
    return moment(date).format("DD/MM/YYYY hh:mm a");
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
