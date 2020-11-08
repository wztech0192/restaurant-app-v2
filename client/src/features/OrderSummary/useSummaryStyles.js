import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    header: {
        display: "flex",
        marginBottom: 15
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
        paddingLeft: "50px",
        fontSize: "0.95em",
        display: "block"
    }
}));
