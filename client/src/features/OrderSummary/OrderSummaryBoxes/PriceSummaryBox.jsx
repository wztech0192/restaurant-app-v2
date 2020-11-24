import React from "react";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
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
        <Box display="flex" maxWidth="240px" justifyContent="flex-end">
            <Paper elevation={5}>
                <Grid container className={classes.priceBox}>
                    <Grid item xs={4}>
                        <Typography align="left">Subtotal:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right">{subtotal.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="left">Tax:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right">{taxedTotal.toFixed(2)}</Typography>
                    </Grid>
                    {Boolean(canEdit || tip) && (
                        <>
                            <Grid item xs={4}>
                                <Typography align="left">Tip:</Typography>
                            </Grid>
                            <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <Typography align="left">
                            <b>Total:</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right">
                            <b>{(subtotal + taxedTotal + tip).toFixed(2)}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default PriceSummaryBox;
