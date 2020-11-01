const logger = store => next => action => {
    if (action.type) {
        console.debug("dispatching", action);
        let result = next(action);
        console.debug("next state", store.getState());
        return result;
    }

    return next(action);
};

export default logger;
