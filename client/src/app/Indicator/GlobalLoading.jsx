import { Fade } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getLoading, LOADING } from "./indicatorSlice";

const timeout = { enter: 0, exit: 500 };
let loadingEl = document.getElementById("global-loading");

const GlobalLoading = () => {
    const loading = useSelector(getLoading(LOADING.GLOBAL));

    React.useEffect(() => {
        if (!loading && loadingEl) {
            loadingEl.parentElement.removeChild(loadingEl);
            loadingEl = null;
        }
    }, [loading]);

    return (
        <Fade in={loading} timeout={timeout}>
            <div id="global-loading">
                <div className="ball-container">
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                </div>
            </div>
        </Fade>
    );
};

export default GlobalLoading;
