import encryptionProvider from "common/encryptionProvider";
import { enqueueSnackbar, handleOpenModal, setLoading } from "./Indicator/indicatorSlice";

export const encryptionAction = (json, success) => dispatch => {
    const encryptedInfo = encryptionProvider.encrypt(json);
    if (encryptedInfo) {
        success(encryptedInfo);
    } else {
        dispatch(
            enqueueSnackbar({
                message: "Encryption Failed",
                variant: "error"
            })
        );
    }
};

export const asyncAction = ({
    promise,
    success,
    failed,
    completed,
    hideErrorModal,
    toggleLoadingFor
}) => async dispatch => {
    let shouldToggle = true;
    try {
        if (toggleLoadingFor) {
            dispatch(setLoading({ target: toggleLoadingFor, loading: true }));
        }

        const res = await promise();

        let data = null;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            data = await res.text();
        }
        if (res.ok) {
            if (success) {
                if (success(data)) {
                    shouldToggle = false;
                }
            }
        } else {
            const error = new Error();
            error.errors = data;
            error.res = res;
            throw error;
        }
    } catch (e) {
        console.error(e);
        if (failed) failed(e);

        if (!hideErrorModal) {
            let title = "Request Error";
            let message = "";
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
                        message =
                            "You are not authorized to access, please try to re-login you account if you believe you have the authority.";
                        break;
                    default:
                        message = !e.errors && "Unexcepted error occurred, please refresh and retry!";
                }
                title = `${e.res.status} ${title}`;
            } else {
                message = "Online Service currently not available. Please try again later.";
            }
            dispatch(
                handleOpenModal({
                    title: title,
                    color: "secondary",
                    message,
                    messages: e.errors
                })
            );
        }
    }

    if (completed) completed();

    if (toggleLoadingFor && shouldToggle) {
        dispatch(setLoading({ target: toggleLoadingFor, loading: false }));
    }
};
