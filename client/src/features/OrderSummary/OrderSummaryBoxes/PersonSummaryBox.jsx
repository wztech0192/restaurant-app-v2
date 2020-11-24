import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";

const PersonSummaryBox = ({ classes, orderInfo }) => {
    return (
        <Box display="flex" maxWidth="240px" justifyContent="flex-end" marginTop="5px">
            <Paper elevation={5}>
                <Grid container className={classes.priceBox}>
                    <Grid item xs={4}>
                        <Typography align="left">Name:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right">
                            <b>{orderInfo.name}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="left">Phone:</Typography>
                    </Grid>
                    <Grid item xs={8}>
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
