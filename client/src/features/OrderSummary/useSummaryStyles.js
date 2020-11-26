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
        padding: 5
    },
    itemList: {
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: "baseline"
    },
    itemOptionSummary: {
        paddingLeft: "40px",
        fontSize: "0.95em",
        display: "block"
    },
    summaryActionGrid: {
        order: 0,
        marginTop: 10,
        [theme.breakpoints.up("md")]: {
            order: 2,
            justifyContent: "space-evenly"
        }
    },
    itemsContainer: {
        overflow: "auto",
        maxHeight: "45vh",
        paddingRight: 13,
        marginRight: -13,
        [theme.breakpoints.up("md")]: {
            maxHeight: "60vh"
        }
    },
    summaryItemsGrid: {
        [theme.breakpoints.up("md")]: {
            borderRight: `1px solid ${theme.palette.divider}`,
            paddingRight: 10
        }
    }
}));
