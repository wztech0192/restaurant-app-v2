import { Button, Checkbox } from "@material-ui/core";
import { EMPTY_ARRAY } from "common";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreditCardForm from "features/CreditCard/CreditCardForm";
import { handleSubmitOrder } from "../slices/orderSlice";

const CartPayment = () => {
    const account = useSelector(state => state.account.accountInfo);
    const cards = account ? account.cards : EMPTY_ARRAY;
    const [saveCard, setSaveCard] = React.useState(false);
    const [payWithExistingCard, setPayWithExistingCard] = React.useState(cards.length > 0);

    const dispatch = useDispatch();
    React.useEffect(() => {
        setPayWithExistingCard(cards.length > 0);
    }, [cards.length]);

    return (
        <>
            <br />

            <CreditCardForm
                account={account}
                payWithExistingCard={payWithExistingCard}
                requiredPersonInfo
                action={(isValid, paymentInfo) => (
                    <div>
                        {payWithExistingCard ? (
                            <br />
                        ) : (
                            account && (
                                <div>
                                    <Checkbox
                                        color="primary"
                                        checked={saveCard}
                                        onClick={e => setSaveCard(e.target.checked)}
                                    />
                                    Save This Card
                                </div>
                            )
                        )}
                        <Button
                            disabled={!isValid}
                            fullWidth
                            autoFocus
                            color="primary"
                            variant="contained"
                            onClick={dispatch(handleSubmitOrder(paymentInfo, payWithExistingCard, saveCard))}
                        >
                            Submit One-Time Payment
                        </Button>
                        {cards.length > 0 && (
                            <Button fullWidth autoFocus onClick={() => setPayWithExistingCard(!payWithExistingCard)}>
                                {payWithExistingCard ? "Pay With New Card" : "Pay With Existing Cards"}
                            </Button>
                        )}
                    </div>
                )}
            />
        </>
    );
};

export default CartPayment;
