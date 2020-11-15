import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { checkIsOrderHubConnected } from "app/centralHub";
import { phoneNum } from "common";

const useBadStatus = () => {
    const isOrderHubConnected = useSelector(checkIsOrderHubConnected);

    if (!isOrderHubConnected) {
        return (
            <Box padding="10px">
                <Typography color="error">
                    The online service is currently unavailable, please try refresh the page or call us at{" "}
                    <a href={`tel:+${phoneNum}`}>{phoneNum}</a>!
                </Typography>
            </Box>
        );
    }

    return null;
    /*
    serviceCloseMessage =
        serviceCloseMessage === undefined ? isServceClosed() : serviceCloseMessage;
    if (serviceCloseMessage) {
        return (
            <Box padding="10px">
                <Typography color="secondary">The online service is offline.</Typography>
                <Typography>
                    The current time is&nbsp;
                    <b>{serviceCloseMessage.currentTime}</b>
                </Typography>
                <Typography>The online service will be available when:</Typography>
                <ol style={{ margin: 0 }}>
                    {serviceCloseMessage.openHours.map((oh, i) => (
                        <li key={i}>
                            <b>
                                {oh.date.join(", ")} {oh.hours[0]} - {oh.hours[1]}
                            </b>
                        </li>
                    ))}
                </ol>
            </Box>
        );
    }
    if (isUnavailable) {
        return (
            <Box padding="10px">
                <Typography color="error">
                    The online service is currently unavailable, please come back later!
                </Typography>
            </Box>
        );
    }
    return null;*/
};

export default useBadStatus;
