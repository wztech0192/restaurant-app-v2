import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";

const PersonSummaryBox = ({ classes, orderInfo }) => {
    return (
        <Box display="flex" justifyContent="flex-end">
            <Paper elevation={5}>
                <Grid container className={classes.priceBox}>
                    <Grid item xs={6}>
                        <Typography align="right">Order Name:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right">
                            <b>{orderInfo.name}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right">Phone:</Typography>
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

export default PersonSummaryBox;
