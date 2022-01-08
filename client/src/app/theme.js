import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "rgb(124, 194, 200)",
            main: "#009ba0",
            dark: "rgb(124, 194, 200)",
        },
    },
    overrides: {
        MuiAccordionSummary: {
            root: {
                minHeight: "auto !important",
                "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: "12px 0px !important",
                },
            },
        },
    },
});

export default theme;
