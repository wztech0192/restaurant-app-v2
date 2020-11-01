import React from "react";
import { Paper, Typography, Grow, TextField, MenuItem, Divider } from "@material-ui/core";
import useStyles from "../useStyles";
import mainFrameImage from "assets/mainFrame.png";
import { handleSelectEntryName } from "../orderSlice";
import { useDispatch, useSelector } from "react-redux";
import MenuEntryTitle from "./MenuEntryTitle";
import MenuItemList from "../MenuItem/MenuItemList";

const MenuEntrySingle = ({ menu, selectedEntryName }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const menuEntry = React.useMemo(() => {
        document.getElementById("root").scrollTop = 0; //scroll to top
        return menu.menuEntries.find(me => me.name === selectedEntryName);
    }, [menu, selectedEntryName]);

    const entrySelection = React.useMemo(
        () =>
            menu.menuEntries.map(menuEntry => (
                <MenuItem key={menuEntry.name} value={menuEntry.name}>
                    <MenuEntryTitle variant="h6" menuEntry={menuEntry} />
                </MenuItem>
            )),
        [menu.menuEntries]
    );

    return (
        <Grow in>
            <div>
                <TextField
                    margin="dense"
                    fullWidth
                    select
                    value={selectedEntryName || ""}
                    variant="outlined"
                    label="Selected Menu"
                    onChange={e => {
                        dispatch(handleSelectEntryName(e.target.value))();
                    }}
                >
                    <MenuItem value="">
                        <Typography variant="h6">Show All</Typography>
                    </MenuItem>
                    <Divider />
                    {entrySelection}
                </TextField>
                <Paper>
                    <MenuItemList menuEntry={menuEntry} />
                </Paper>
            </div>
        </Grow>
    );
};

export default MenuEntrySingle;
