import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import encryptionProvider from "common/encryptionProvider";

const PaymentSummaryBox = ({ classes, orderInfo }) => {
    const paymentInfo = React.useMemo(() => {
        if (selected) {
            try {
                return JSON.parse(encryptionProvider.decrypt(selected.payment));
            } catch (e) {
                console.error(e);
                return { card: "unavailable", expireDate: "unavailable" };
            }
        }
        return "";
    }, [selected, state.conn]);

    return (
        <Box display="flex" justifyContent="flex-end" marginTop="5px">
            <Paper elevation={5}>
                <Grid container className={classes.priceBox}>
                    <Grid item xs={6}>
                        <Typography align="right">Card:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right">
                            <b>{orderInfo.name}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right"> Expiration Date:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right">
                            <b>{orderInfo.phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3")}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default PaymentSummaryBox;
