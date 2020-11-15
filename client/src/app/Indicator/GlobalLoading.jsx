import React from "react";
import { useSelector } from "react-redux";
import { getLoading, LOADING } from "./indicatorSlice";

const loadingEl = document.getElementById("global-loading");

const GlobalLoading = () => {
    const loading = useSelector(getLoading(LOADING.GLOBAL));
    React.useEffect(() => {
        if (loading && loadingEl.classList.contains("fade")) {
            loadingEl.classList.remove("fade");
            loadingEl.style.visibility = "visible";
        } else if (!loading && !loadingEl.classList.contains("fade")) {
            loadingEl.classList.add("fade");
        }
        const transtion = () => {
            if (!loading) {
                loadingEl.style.visibility = "hidden";
            }
        };
        loadingEl.addEventListener("transitionend", transtion);
        return () => {
            loadingEl.removeEventListener("transitionend", transtion);
        };
    }, [loading]);

    return null;
};

export default GlobalLoading;
