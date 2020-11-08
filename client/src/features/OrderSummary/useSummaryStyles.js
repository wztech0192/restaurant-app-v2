import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    header: {
        display: "flex",
        padding: "15px 0",
        zIndex: 2,
        background: "white",
        position: "sticky",
        top: 0,
        boxShadow: "0px 3px 0px -2px lightgrey;"
    },
    flexGrow: {
        flexGrow: 1
    },
    paymentActionBox: {
        display: "flex",
        alignItems: "center",
        marginTop: 15
    },
    priceBox: {
        width: 120
    },
    itemList: {
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: "baseline"
    },
    itemsContainer: {
        overflow: "auto",
        maxHeight: "45vh"
    },
    itemOptionSummary: {
        paddingLeft: "40px",
        fontSize: "0.95em",
        display: "block"
    }
}));
