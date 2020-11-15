import { phoneNum } from "common";
import { handleOpenModal, setGlobalLoading } from "app/Indicator/indicatorSlice";
import { encryptionAction } from "app/sharedActions";

let invoke = null;

const SUBMIT_ORDER = "SubmitOrder";
const timeouts = {};

export default (dispatch, getState, _invoke) => {
    invoke = _invoke;
    return {
        SUBMIT_ORDER: order => {
            dispatch(setGlobalLoading(false));
            clearTimeout(timeouts[SUBMIT_ORDER]);
        }
    };
};

export const handleSubmitOrder = (paymentInfo, payWithExistingCard, saveCard) => (dispatch, getState) => e => {
    const order = getState().order.cart;
    const payload = {
        ...order,
        name: paymentInfo.name,
        phone: paymentInfo.phone
    };

    if (payWithExistingCard) {
        payload.cardId = paymentInfo.cardId;
        payload.saveCard = saveCard;
    } else {
        const json = JSON.stringify({
            card: paymentInfo.card,
            expireDate: paymentInfo.expireDate
        });
        payload.lastFourDigit = paymentInfo.card.slice(-4);
        dispatch(
            encryptionAction(json, encryptedCardInfo => {
                payload.encryptedCardInfo = encryptedCardInfo;
            })
        );

        if (!payload.encryptedCardInfo) {
            return;
        }
    }

    dispatch(setGlobalLoading(true));
    timeouts[SUBMIT_ORDER] = setTimeout(() => {
        dispatch(setGlobalLoading(false));
        dispatch(
            handleOpenModal({
                title: "Timeout",
                color: "secondary",
                message: `Unexcepted error occurred. You order was not submitted, please try again or give us a call at ${phoneNum}!`
            })
        );
    }, 10000);

    console.log(JSON.stringify(payload));
    // invoke(SUBMIT_ORDER, payload);
};
