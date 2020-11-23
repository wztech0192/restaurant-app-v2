import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import TextFieldWrapper from "common/components/TextFieldWrapper";
import NumberFormatCustom from "common/components/NumberCustomFormat";

const InputProps = {
    inputComponent: NumberFormatCustom
};
const inputProps = {
    inputMode: "decimal",
    style: {
        textAlign: "right",
        padding: 0
    }
};

const useStyles = makeStyles({
    root: {
        marginTop: 0,
        float: "right",
        width: "80%"
    }
});

const PriceSummaryBox = ({ classes, handleUpdateTip, canEdit, tip = 0, subtotal = 0, tax = 0 }) => {
    const tipFieldClasses = useStyles();
    const taxedTotal = subtotal * tax;
    return (
        <Paper elevation={5}>
            <Grid container className={classes.priceBox}>
                <Grid item xs={6}>
                    <Typography align="right">Subtotal:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right">{subtotal.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right">Tax:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right">{taxedTotal.toFixed(2)}</Typography>
                </Grid>
                {Boolean(canEdit || tip) && (
                    <>
                        <Grid item xs={6}>
                            <Typography align="right">Tip:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldWrapper
                                disabled={!canEdit}
                                fullWidth
                                variant="standard"
                                name="tip"
                                value={tip.toFixed(2)}
                                classes={tipFieldClasses}
                                size="small"
                                margin="dense"
                                onChange={handleUpdateTip}
                                InputProps={InputProps}
                                inputProps={inputProps}
                            />
                        </Grid>
                    </>
                )}
                <Grid item xs={6}>
                    <Typography align="right">
                        <b>Total:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right">
                        <b>{(subtotal + taxedTotal + tip).toFixed(2)}</b>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PriceSummaryBox;
