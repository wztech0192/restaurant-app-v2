import { Button } from "@material-ui/core";
import React from "react";
import MapIcon from "@material-ui/icons/Room";

const MapButton = () => {
    return (
        <Button
            align="center"
            fullWidth
            component="a"
            href="https://goo.gl/maps/V68GgbjqPcu45CkWA"
            target="_blank"
        >
            <MapIcon className="sub" /> 246 Eastgate Drive, Aiken, SC 29803
        </Button>
    );
};

export default MapButton;
