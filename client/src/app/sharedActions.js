import { handleOpenModal } from "./Indicator/indicatorSlice";

export const asyncAction = ({ promise, success, failed, completed }) => async dispatch => {
    try {
        const res = await promise();
        const json = await res.json();
        if (res.ok) {
            if (success) success(json);
        } else {
            const error = new Error();
            error.errors = json;
            error.res = res;
            throw error;
        }
    } catch (e) {
        if (failed) failed(e);

        let title = "Request Error";
        if (e.res) {
            switch (e.res.status) {
                case 404:
                    title = "Not Found";
                    break;
                case 400:
                    title = "Bad Request";
                    break;
                case 401:
                    title = "Unauthorized";
                    break;
                default:
            }
            title = `${e.res.status} ${title}`;
        }
        dispatch(
            handleOpenModal({
                title: title,
                color: "secondary",
                message: !e.errors && "Unexcepted error occurred, please refresh and retry!",
                messages: e.errors
            })
        );
    }
    if (completed) completed();
};
