import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import encryptionProvider from "common/encryptionProvider";

const PaymentSummaryBox = ({ classes, encryptedCardInfo }) => {
    const [reload, setReload] = React.useState(0);

    const paymentInfo = React.useMemo(() => {
        try {
            const decrypted = encryptionProvider.decrypt(encryptedCardInfo);
            if (decrypted) {
                return JSON.parse(decrypted);
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    }, [encryptedCardInfo, reload]);

    return (
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
            <Paper elevation={5}>
                {paymentInfo ? (
                    <Grid container className={classes.priceBox}>
                        <Grid item xs={6}>
                            <Typography align="right">Card:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right">
                                <b> {paymentInfo.card && paymentInfo.card.replace(/(\d{4})/g, "$1 ")}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right">Expiration Date:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right">
                                <b>{paymentInfo.expireDate}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Button
                        color="primary"
                        onClick={() => {
                            encryptionProvider.promptPublicKey();
                            setReload(reload + 1);
                        }}
                    >
                        Insert Decryption Key
                    </Button>
                )}
            </Paper>
        </Box>
    );
};

export default PaymentSummaryBox;
