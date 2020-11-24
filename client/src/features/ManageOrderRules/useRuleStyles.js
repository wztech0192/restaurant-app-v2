import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        padding: 24
    },
    menuContainer: {
        padding: "8px 24px"
    },
    summary: {
        "& .MuiAccordionSummary-content": {
            alignItems: "center"
        }
    },
    header: {
        flexGrow: 1,
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    skeleton: {
        marginBottom: 10
    }
}));
