import { Typography } from "@material-ui/core";
import React from "react";

const OrderSubmitMessage = ticketNum => {
    return (
        <>
            <Typography>
                Thank you, the order will be prepared in <b>~15 minutes</b>
                <br />
                <br />
                Your Ticket Number Is: &nbsp;
                <b>{ticketNum}</b>
            </Typography>
            <br /> <br />
            <Typography color="textSecondary" variant="caption">
                If your order is still in PENDING status for 5 minutes, that indicate we didn't process/receive your
                order and please give us a call.
            </Typography>
        </>
    );
};

export default OrderSubmitMessage;
