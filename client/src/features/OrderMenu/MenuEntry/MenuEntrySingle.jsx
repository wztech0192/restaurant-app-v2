import React from "react";
import { Paper, Grow, TextField, MenuItem, IconButton, Typography } from "@material-ui/core";
import useStyles from "../useStyles";
import { setSelectedEntryName } from "../slices/orderSlice";
import { useDispatch } from "react-redux";
import MenuEntryTitle from "./MenuEntryTitle";
import MenuItemList from "../MenuItem/MenuItemList";
import PreviousIcon from "@material-ui/icons/ArrowBackIos";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import { validateRule } from "features/ManageOrderRules/ruleValidator";
const MenuEntrySingle = ({ menu, selectedEntryName, orderRules }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const menuEntryIndex = React.useMemo(() => {
        document.getElementById("root").scrollTop = 0; //scroll to top
        return menu.menuEntries.findIndex(me => me.name === selectedEntryName);
    }, [menu, selectedEntryName]);

    const menuEntry = menu.menuEntries[menuEntryIndex];
    const entrySelection = React.useMemo(
        () =>
            menu.menuEntries.map(menuEntry => (
                <MenuItem key={menuEntry.name} value={menuEntry.name}>
                    <MenuEntryTitle variant="subtitle1" menuEntry={menuEntry} />
                </MenuItem>
            )),
        [menu.menuEntries]
    );

    const isRuleValid = validateRule(orderRules, menuEntry.name);

    return (
        <Grow in>
            <div>
                <Paper elevation={4} className={classes.singleEntreeHeader}>
                    <IconButton
                        color="primary"
                        onClick={e => {
                            let previousIndex = menuEntryIndex - 1;
                            if (previousIndex < 0) {
                                previousIndex = menu.menuEntries.length - 1;
                            }

                            dispatch(setSelectedEntryName(menu.menuEntries[previousIndex].name));
                        }}
                    >
                        <PreviousIcon />
                    </IconButton>
                    <TextField
                        margin="dense"
                        select
                        size="small"
                        style={{ flexGrow: 1 }}
                        value={selectedEntryName || ""}
                        variant="outlined"
                        onChange={e => {
                            dispatch(setSelectedEntryName(e.target.value));
                        }}
                    >
                        {entrySelection}
                    </TextField>
                    <IconButton
                        color="primary"
                        onClick={e => {
                            let nextIndex = menuEntryIndex + 1;
                            if (nextIndex >= menu.menuEntries.length) {
                                nextIndex = 0;
                            }
                            dispatch(setSelectedEntryName(menu.menuEntries[nextIndex].name));
                        }}
                    >
                        <NextIcon />
                    </IconButton>
                </Paper>

                {isRuleValid ? (
                    <Paper>
                        <MenuItemList orderRules={orderRules} menuEntry={menuEntry} />
                    </Paper>
                ) : (
                    <Typography color="error">
                        <br />
                        This Entree is currently unavaiable!
                        <br />
                    </Typography>
                )}
            </div>
        </Grow>
    );
};

export default MenuEntrySingle;
