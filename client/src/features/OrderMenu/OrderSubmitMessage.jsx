import { Typography } from "@material-ui/core";
import React from "react";

const OrderSubmitMessage = ticketNum => {
    return (
        <Typography>
            Thank you, the order will be prepared in <b>~15 minutes</b>
            <br />
            <br />
            Your Ticket Number Is: &nbsp;
            <b>{ticketNum}</b>
        </Typography>
    );
};

export default OrderSubmitMessage;
