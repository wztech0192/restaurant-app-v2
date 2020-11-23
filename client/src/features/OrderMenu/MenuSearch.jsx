import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
    ClickAwayListener,
    fade,
    InputBase,
    List,
    ListItem,
    ListSubheader,
    makeStyles,
    Paper,
    Popper
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { EMPTY_ARRAY, EMPTY_OBJECT } from "common";
import MenuItemSingle from "./MenuItem/MenuItemSingle";
import { validateRule } from "features/ManageOrderRules/ruleValidator";

const useStyles = makeStyles(theme => ({
    inputRoot: {
        color: "inherit",
        width: "100%"
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
    popper: {
        zIndex: theme.zIndex.appBar + 1
    },
    root: {
        width: "100%",
        minWidth: 284,
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        maxHeight: 300
    },
    listSection: {
        backgroundColor: "inherit"
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0
    }
}));

const DefaultDisplayEntryName = "Side Orders";
const MenuSearchItems = React.memo(
    ({ classes, search, orderRules, entries }) => {
        search = search.toLowerCase();
        if (!search) {
            const defaultEntry = entries.find(en => en.name === DefaultDisplayEntryName);
            entries = defaultEntry ? [defaultEntry] : EMPTY_ARRAY;
        }

        const result = entries.reduce((acc, entry) => {
            if (validateRule(orderRules, entry.name)) {
                const items = entry.menuItems.reduce((itemAcc, item) => {
                    if (item.name.toLowerCase().includes(search))
                        itemAcc.push(
                            <MenuItemSingle key={item.name} menuEntry={entry} menuItem={item} orderRules={orderRules} />
                        );
                    return itemAcc;
                }, []);

                if (items.length > 0)
                    acc.push(
                        <li key={entry.name} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader>{entry.name}</ListSubheader>
                                {items}
                            </ul>
                        </li>
                    );
            }
            return acc;
        }, []);
        return (
            <Paper>
                <List className={classes.root} subheader={<li />}>
                    {result.length > 0 ? result : <ListItem>Empty...</ListItem>}
                </List>
            </Paper>
        );
    },
    (prev, next) => !next.open
);

const MenuSearch = () => {
    const classes = useStyles();
    const menu = useSelector(state => state.menu);
    const orderRules = useSelector(state => state.orderRules);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const anchorEl = React.useRef();

    return (
        <ClickAwayListener
            onClickAway={e => {
                setOpen(false);
            }}
        >
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    ref={anchorEl}
                    onClick={() => {
                        setOpen(true);
                    }}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search Menu..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                />

                <Popper
                    className={classes.popper}
                    placement="bottom-start"
                    transition
                    anchorEl={anchorEl.current}
                    open={open}
                >
                    <MenuSearchItems
                        classes={classes}
                        open={open}
                        entries={(menu && menu.menuEntries) || EMPTY_ARRAY}
                        search={search}
                        orderRules={orderRules || EMPTY_OBJECT}
                    />
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

export default MenuSearch;
