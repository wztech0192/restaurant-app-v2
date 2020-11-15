import {
    Fade,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box
} from "@material-ui/core";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "common";
import PhoneMask from "common/phoneMask";
import TextFieldWrapper from "common/TextFieldWrapper";
import React from "react";
import cardValidator from "card-validator";
import CardList from "./CardList";

const phoneMaskInputProps = {
    inputComponent: PhoneMask
};

const CreditCardForm = ({
    account = EMPTY_OBJECT,
    payWithExistingCard,
    action,
    requiredPersonInfo
}) => {
    const [paymentInfo, setPaymentInfo] = React.useState({
        cardId: account.defaultCardId
    });

    const ref = React.useRef();
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
        setPaymentInfo({
            cardId: account.defaultCardId
        });
    }, [ref, account]);

    const updatePaymentInfo = (name, value) => {
        setPaymentInfo({
            ...paymentInfo,
            [name]: value
        });
    };
    const handleUpdatePaymentInfo = e => {
        updatePaymentInfo(e.target.name, e.target.value);
    };

    const cardValidation = React.useMemo(() => cardValidator.number(paymentInfo.card), [
        paymentInfo.card
    ]);

    const expireDateValidation = React.useMemo(
        () => cardValidator.expirationDate(paymentInfo.expireDate),
        [paymentInfo.expireDate]
    );

    const isValid =
        (paymentInfo.cardId || (cardValidation.isValid && expireDateValidation.isValid)) &&
        (!requiredPersonInfo ||
            (paymentInfo.phone && paymentInfo.phone.length === 10 && paymentInfo.name));
    return (
        <Fade in>
            <div ref={ref}>
                {requiredPersonInfo && (
                    <>
                        <TextFieldWrapper
                            InputProps={phoneMaskInputProps}
                            required
                            error={paymentInfo.phone && paymentInfo.phone.length !== 10}
                            value={paymentInfo.phone}
                            name="phone"
                            onChange={e => {
                                updatePaymentInfo(
                                    e.target.name,
                                    e.target.value.replace(/[\D]/g, "")
                                );
                            }}
                            margin="dense"
                            size="small"
                            label="Contact Phone Number"
                        />
                        <TextFieldWrapper
                            required
                            value={paymentInfo.name}
                            name="name"
                            onChange={handleUpdatePaymentInfo}
                            margin="dense"
                            size="small"
                            label="Pick Up Name"
                        />
                    </>
                )}
                {!payWithExistingCard ? (
                    <div>
                        <TextFieldWrapper
                            required
                            margin="dense"
                            size="small"
                            value={paymentInfo.card}
                            error={paymentInfo.card && !cardValidation.isValid}
                            label="Card Number"
                            // error={paymentInfo.card.validation && !paymentInfo.card.validation.isValid}
                            name="card"
                            onChange={handleUpdatePaymentInfo}
                        />
                        <TextFieldWrapper
                            required
                            margin="dense"
                            size="small"
                            label="Expiration Date (MM/YY)"
                            error={paymentInfo.expireDate && !expireDateValidation.isValid}
                            value={paymentInfo.expireDate}
                            // error={payment.expireDate.validation && !payment.expireDate.validation.isValid}
                            name="expireDate"
                            onChange={handleUpdatePaymentInfo}
                        />
                    </div>
                ) : (
                    <Box display="flex" justifyContent="flex-start" alignItems="center">
                        <Box minWith="100px">
                            <Typography variant="subtitle2">Pay with:</Typography>
                        </Box>
                        <CardList
                            account={account}
                            canEdit
                            onSelect={id => {
                                updatePaymentInfo("cardId", id);
                            }}
                            defaultCardId={paymentInfo.cardId}
                        />
                    </Box>
                )}
                <br />
                {action(isValid, paymentInfo)}
                <br />
            </div>
        </Fade>
    );
};

export default CreditCardForm;
