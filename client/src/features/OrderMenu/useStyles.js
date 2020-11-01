import makeStyles from "@material-ui/core/styles/makeStyles";
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
    menuBody: {
        marginBottom: 80,
        marginLeft: 0,
        marginRight: 0,
        width: "100%"
    },
    menuTitle: {
        color: "inherit",
        fontSize: 20,
        "&:before": {
            borderColor: "rgb(0, 155, 160)"
        },
        "&:after": {
            borderColor: "inherit"
        },
        "& svg": {
            color: "inherit"
        }
    },
    expandDetail: {
        padding: "0 8px",
        display: "block"
    },
    menuEntryContent: {
        paddingTop: 5
    },
    expandHead: {
        minHeight: "auto !important",
        padding: "0 14px 0 24px !important",
        "& .MuiExpansionPanelSummary-content": {
            margin: 0,
            justifyContent: "space-between",
            alignItems: "center"
        }
    },
    cartButton: {
        position: "fixed",
        bottom: 24,
        right: 12
    },
    clearBtn: {
        position: "fixed",
        bottom: 30,
        left: 8
    },
    foodOptions: {
        paddingLeft: "1.5em",
        fontSize: "0.95em",
        display: "block"
    },
    addtionalRequestField: {
        paddingTop: 0,
        paddingBottom: 0,
        "& .MuiTextField-root": {
            marginTop: 0
        },
        "& .MuiInputBase-root": {
            paddingRight: 100
        }
    },
    cart: {
        maxHeight: "90vh",
        overflow: "auto",
        "& hr": {
            margin: "0px 16px"
        }
    },
    cartHeader: {
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: 10
    },
    footer: {
        background: "rgb(0, 155, 160)"
    },
    entryBadge: {
        display: "block"
    },
    media: {
        height: 140
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        maxWidth: "25ch",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        },
        [theme.breakpoints.up("md")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        maxWidth: "25ch",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    menuItemActions: {
        right: 0
    },
    menuItemContainer: {
        paddingRight: 85
    }
}));
