import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import MenuSelector from "./MenuSelector";
import MenuEditor from "./MenuEditor";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 24
    },
    menuContainer: {
        padding: "8px 24px"
    }
}));

const ManageMenuContainer = ({ setHeader }) => {
    React.useEffect(() => {
        setHeader({ title: "Manage Menu" });
    }, [setHeader]);

    const classes = useStyles();
    const selectedID = useSelector(state => state.manageMenu.selectedMenu.id);

    return (
        <>
            <Paper className={classes.root}>
                <MenuSelector selectedID={selectedID} />
            </Paper>
            <br />
            <br />
            {selectedID && <MenuEditor selectedID={selectedID} />}
        </>
    );
};

export default ManageMenuContainer;
