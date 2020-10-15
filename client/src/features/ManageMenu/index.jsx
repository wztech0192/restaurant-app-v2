import {
    IconButton,
    Chip,
    Divider,
    Grow,
    makeStyles,
    MenuItem,
    Paper,
    Typography,
    Button
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuSelector from "./MenuSelector";
import SaveIcon from "@material-ui/icons/Save";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import FormatShapesIcon from "@material-ui/icons/FormatShapes";
import { handleFetchMenuInfo, handleSetMenuInfoJson, MenuStatus } from "./manageMenuSlice";
import TextFieldWrapper from "common/TextFieldWrapper";
import SkeletonWrapper from "common/SkeletonWrapper";
import { getLoading } from "app/Indicator/indicatorSlice";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 24
    },
    menuContainer: {
        padding: "8px 24px"
    }
}));

const ManageMenu = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { infoJson, info, name, isValid } = useSelector(state => state.manageMenu.selectedMenu);
    const loading = useSelector(getLoading("manageMenu"));

    React.useEffect(() => {
        if (!info) {
            dispatch(handleFetchMenuInfo(name));
        }
    }, [info, name]);

    return (
        <>
            <Paper className={classes.root}>
                <MenuSelector selectedMenu={name} />
            </Paper>
            <br />
            <br />
            {name && (
                <Grow in>
                    <Paper elevation={4} className={classes.menuContainer}>
                        <SkeletonWrapper loading={loading || !info}>
                            <div>
                                <div>
                                    <IconButton color="secondary">
                                        <DeleteIcon />
                                    </IconButton>

                                    <IconButton disabled={!isValid} className="floatRight">
                                        <FileCopyIcon />
                                    </IconButton>
                                    <IconButton color="primary" className="floatRight">
                                        <SaveIcon />
                                    </IconButton>
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

                                {info.status === MenuStatus.Saved ? (
                                    <Button variant="contained" fullWidth color="primary">
                                        Use This Menu
                                    </Button>
                                ) : (
                                    info.status !== MenuStatus.Active && (
                                        <Button variant="outlined" fullWidth color="primary">
                                            Complete This Menu
                                        </Button>
                                    )
                                )}
                            </div>
                        </SkeletonWrapper>
                    </Paper>
                </Grow>
            )}
        </>
    );
};

export default ManageMenu;
