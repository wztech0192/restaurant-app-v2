import { Button, Checkbox } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const SubmitPaymentAction = ({ isValid, paymentInfo }) => {
    const account = useSelector(state => state.account.accountInfo);

    const [saveCard, setSaveCard] = React.useState(false);
    return (
        <div>
            {account && !paymentInfo.encryptedCardInfo && (
                <div>
                    <Checkbox
                        color="primary"
                        checked={saveCard}
                        onClick={e => setSaveCard(e.target.checked)}
                    />
                    Save This Card
                </div>
            )}
            <Button
                disabled={!isValid}
                fullWidth
                autoFocus
                color="primary"
                variant="contained"
                onClick={() => {
                    // actions.submitOrder(orderCart);
                }}
            >
                Submit One-Time Payment
            </Button>
        </div>
    );
};

export default SubmitPaymentAction;
