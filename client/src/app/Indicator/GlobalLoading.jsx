import { Backdrop } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getLoading, LOADING } from "./indicatorSlice";

const loadingEl = document.getElementById("global-loading");
loadingEl.addEventListener("transitionend", function () {
    loadingEl.style.visibility = "hidden";
});
const GlobalLoading = () => {
    const loading = useSelector(getLoading(LOADING.GLOBAL));
    React.useEffect(() => {
        if (loading && loadingEl.classList.contains("fade")) {
            loadingEl.classList.remove("fade");
            loadingEl.style.visibility = "visible";
        } else if (!loading && !loadingEl.classList.contains("fade")) {
            loadingEl.classList.add("fade");
        }
    }, [loading]);

    return null;
};

export default GlobalLoading;
