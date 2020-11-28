import moment from "moment";
const timeFormat = "hh:mm";
export const validTimeRange = activeTimes => {
    const now = moment();
    const day = now.day();
    let result = true;
    for (let time of activeTimes) {
        const { isValid, daysOfWeek, start, stop } = time;
        if (isValid) {
            if (
                daysOfWeek.includes(day) &&
                now.isBetween(moment(start, timeFormat), moment(stop, timeFormat))
            ) {
                return true;
            } else {
                result = false;
            }
        }
    }
    return result;
};

export const validateRule = (orderRules, name) => {
    const rule = orderRules[name.toLowerCase()];

    if (rule) {
        if (!rule.activeTarget || !validTimeRange(rule.activeTimes)) {
            return false;
        }
    }

    return true;
};
