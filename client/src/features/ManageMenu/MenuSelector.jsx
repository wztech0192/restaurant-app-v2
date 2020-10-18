import React from "react";
import { Chip, MenuItem, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchMenus, handleSelectMenu, MenuStatus } from "./manageMenuSlice";
import SkeletonWrapper from "common/SkeletonWrapper";

const getChipPropByStatus = status => {
    switch (status) {
        case MenuStatus.Active: {
            return {
                color: "primary",
                label: "Active"
            };
        }
        case MenuStatus.Saved: {
            return {
                label: "Saved",
                variant: "outlined",
                color: "primary"
            };
        }
        case MenuStatus.Draft: {
            return {
                label: "Draft"
            };
        }
        default: {
            return {
                label: "New",
                variant: "outlined"
            };
        }
    }
};

const MenuSelector = ({ selectedID }) => {
    const dispatch = useDispatch();
    const menus = useSelector(state => state.manageMenu.menus);

    React.useEffect(() => {
        if (!menus) {
            dispatch(handleFetchMenus);
        }
    }, [menus, dispatch]);

    const MenuOptions = React.useMemo(
        () =>
            menus
                ? menus.map(({ name, status, id }) => (
                      <MenuItem key={name} value={id}>
                          {name} &nbsp;&nbsp;
                          <Chip {...getChipPropByStatus(status)} size="small" />
                      </MenuItem>
                  ))
                : [],
        [menus]
    );

    return (
        <SkeletonWrapper loading={!menus}>
            <TextField
                fullWidth
                select
                variant="outlined"
                label="Select Menu"
                value={selectedID}
                name="selectedID"
                onChange={dispatch(handleSelectMenu)}
            >
                <MenuItem value="-1">
                    <Typography color="primary">
                        <b>CREATE NEW MENU</b>
                    </Typography>
                </MenuItem>
                {MenuOptions}
            </TextField>
        </SkeletonWrapper>
    );
};

export default MenuSelector;
