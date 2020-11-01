import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

const MenuSearch = ({ classes }) => {
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search Menu..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
            />
        </div>
    );
};

export default MenuSearch;
