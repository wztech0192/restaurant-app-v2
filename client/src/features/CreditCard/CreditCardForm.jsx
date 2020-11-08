import {
    Fade,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "common";
import PhoneMask from "common/phoneMask";
import TextFieldWrapper from "common/TextFieldWrapper";
import React from "react";
import cardValidator from "card-validator";

const phoneMaskInputProps = {
    inputComponent: PhoneMask
};

const CreditCardForm = ({ existingCards = EMPTY_ARRAY, action }) => {
    const [paymentInfo, setPaymentInfo] = React.useState(EMPTY_OBJECT);

    const ref = React.useRef();
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
        setPaymentInfo(EMPTY_OBJECT);
    }, [ref]);

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
        (paymentInfo.encryptedCardInfo ||
            (cardValidation.isValid && expireDateValidation.isValid)) &&
        paymentInfo.phone &&
        paymentInfo.phone.length === 10 &&
        paymentInfo.name;

    return (
        <Fade in>
            <div ref={ref}>
                <TextFieldWrapper
                    InputProps={phoneMaskInputProps}
                    required
                    error={paymentInfo.phone && paymentInfo.phone.length !== 10}
                    value={paymentInfo.phone}
                    name="phone"
                    onChange={e => {
                        updatePaymentInfo(e.target.name, e.target.value.replace(/[\D]/g, ""));
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
                {existingCards.length <= 0 ? (
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
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Existing Cards</FormLabel>
                            <RadioGroup
                                name="encryptedCardInfo"
                                value={paymentInfo.encryptedCardInfo}
                                onChange={handleUpdatePaymentInfo}
                                color="primary"
                            >
                                {existingCards.map(card => (
                                    <FormControlLabel
                                        key={card.id}
                                        value={card.encryptedCardInfo}
                                        control={<Radio />}
                                        label={`Card End With ${card.lastFourDigit}`}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                )}
                <br />
                <br />
                {action(isValid, paymentInfo)}
                <br />
                <br />
            </div>
        </Fade>
    );
};

export default CreditCardForm;
