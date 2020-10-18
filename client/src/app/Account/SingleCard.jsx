import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';

export default React.memo(() => {
    const identifier = useSelector(state => state.account.cardID);
    return (
                <>
                    <TextFieldWrapper
                        required
                        label="Card Description"
                        name="cardDescription"
                        type="text"
                        // error={cardDescriptionCheck}
                        value={state.newPassword}
                        disabled={loading}
                        // helperText="Minimum 6 characters "
                        onChange={handleUpdateState}
                    />
                    <TextFieldWrapper
                        required
                        label="Credit Card Number"
                        name="cardNumber"
                        // error={cardNumberCheck}
                        type="password"
                        value={state.confirmPassword}
                        disabled={loading}
                        onChange={handleUpdateState}
                    />

                </>
    )
});