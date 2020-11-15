import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "rgb(124, 194, 200)",
            main: "rgb(0, 155, 160)",
            dark: "rgb(124, 194, 200)"
        }
    },
    overrides: {
        MuiAccordionSummary: {
            root: {
                minHeight: "auto !important",
                "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: "12px 0px !important"
                }
            }
        }
    }
});

export default theme;
