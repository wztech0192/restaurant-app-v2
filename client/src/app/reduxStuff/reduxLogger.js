const logger = store => next => action => {
    if (action.type) {
        console.group(action.type);
        console.log("dispatching", action);
        let result = next(action);
        console.log("next state", store.getState());
        console.groupEnd();
        return result;
    }

    return next(action);
};

export default logger;
