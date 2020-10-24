import {
    IconButton,
    Grow,
    makeStyles,
    Paper,
    Typography,
    Button,
    Tooltip
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import RemoveIcon from "@material-ui/icons/Delete";
import {
    handleFetchMenuInfo,
    handleSaveMenu,
    handleSetMenuInfoJson,
    handleCloneMenu,
    MenuStatus,
    handleRemoveMenu
} from "./manageMenuSlice";
import TextFieldWrapper from "common/TextFieldWrapper";
import SkeletonWrapper from "common/SkeletonWrapper";
import { getLoading } from "app/Indicator/indicatorSlice";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 24
    },
    menuContainer: {
        padding: "8px 24px"
    },
    buttons: {
        display: "flex"
    },
    grow: {
        flexGrow: 1
    }
}));

const MenuEditor = ({ selectedID }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { infoJson, info, isValid } = useSelector(state => state.manageMenu.selectedMenu);
    const loading = useSelector(getLoading("manageMenu"));

    const status = info && info.status;

    React.useEffect(() => {
        if (!info) {
            dispatch(handleFetchMenuInfo(selectedID));
        }
    }, [info, selectedID, dispatch]);

    return (
        <Grow in>
            <Paper elevation={4} className={classes.menuContainer}>
                <SkeletonWrapper loading={loading || !info}>
                    <div className={classes.buttons}>
                        {status === MenuStatus.Draft && (
                            <Tooltip title="Remove">
                                <IconButton color="secondary" onClick={dispatch(handleRemoveMenu)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <div className={classes.grow} />
                        {status !== MenuStatus.New && (
                            <Tooltip title="Clone">
                                <IconButton onClick={dispatch(handleCloneMenu)} disabled={!isValid}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {(status === MenuStatus.New || status === MenuStatus.Draft) && (
                            <Tooltip title="Save Draft">
                                <IconButton
                                    color="primary"
                                    disabled={!isValid}
                                    onClick={dispatch(handleSaveMenu)}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>

                    <Typography color="error">{!isValid && "Invalid JSON"}</Typography>
                    <TextFieldWrapper
                        color={!isValid ? "secondary" : undefined}
                        multiline
                        value={infoJson}
                        onChange={dispatch(handleSetMenuInfoJson)}
                    />

                    <br />
                    <br />

                    {status === MenuStatus.Saved ? (
                        <Button variant="contained" disabled={!isValid} fullWidth color="primary">
                            Use This Menu
                        </Button>
                    ) : (
                        status === MenuStatus.Draft && (
                            <Button
                                variant="outlined"
                                disabled={!isValid}
                                fullWidth
                                color="primary"
                            >
                                Complete This Menu
                            </Button>
                        )
                    )}
                </SkeletonWrapper>
            </Paper>
        </Grow>
    );
};

export default MenuEditor;
