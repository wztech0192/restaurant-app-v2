import React from "react";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    Switch,
    Tooltip,
    Typography
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    handleAddNewCard,
    handleEditAccountInfo,
    handleUpdateAccount,
    setCardAsDefault,
    removeCard,
    handleEditAccountInfoPhone
} from "../accountSlice";
import TextFieldWrapper from "common/TextFieldWrapper";
import ErrorDisplayer from "common/ErrorDisplayer";
import UndoIcon from "@material-ui/icons/Undo";
import CardList from "features/CreditCard/CardList";
import AddCardModal from "features/CreditCard/AddCardModal";

const progessBarStyle = {
    width: "90%",
    height: "10px",
    borderRadius: 50
};

const ProfileEdit = ({ loading, errors, handleToggleEdit }) => {
    const [changePassword, setChangePassword] = React.useState(false);
    const [openAddCardModal, setOpenAddCardModal] = React.useState(false);
    const state = useSelector(state => state.account.editAccountInfo);
    const dispatch = useDispatch();
    const handleUpdateState = dispatch(handleEditAccountInfo);

    const passwordCheck =
        state.newPassword && state.newPassword.length < 6 && "Minimum 6 characters required";
    const confirmPasswordCheck =
        state.confirmPassword &&
        state.confirmPassword !== state.newPassword &&
        "Password not match";

    const canSave =
        state.phone &&
        state.name &&
        (!changePassword ||
            (state.confirmPassword &&
                state.newPassword &&
                state.password &&
                !passwordCheck &&
                !confirmPasswordCheck));

    return (
        <form>
            <Box overflow="auto" width="100%" maxHeight="60vh" padding="10px" marginLeft="-10px">
                <TextFieldWrapper
                    required
                    label="Name"
                    disabled={loading}
                    name="name"
                    value={state.name}
                    onChange={handleUpdateState}
                />
                <TextFieldWrapper
                    required
                    label="Phone Number"
                    phoneMask
                    name="phone"
                    error={state.phone && state.phone.length !== 10}
                    value={state.phone}
                    disabled={loading}
                    onChange={dispatch(handleEditAccountInfoPhone)}
                />

                <br />
                <br />
                <Accordion elevation={5}>
                    <AccordionSummary>
                        <Box flexGrow="1"> Manage Credit Cards</Box>
                        <Chip size="small" label={state.cards.length} />
                    </AccordionSummary>
                    <AccordionDetails>
                        {state.cards.length > 0 ? (
                            <CardList
                                canEdit
                                onSelect={id => dispatch(setCardAsDefault(id))}
                                onRemove={id => dispatch(removeCard(id))}
                                account={state}
                            />
                        ) : (
                            <Typography variant="caption">Empty...</Typography>
                        )}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button onClick={e => setOpenAddCardModal(true)}>Add New Card</Button>
                    </AccordionActions>
                </Accordion>
                <br />
                <Accordion
                    elevation={5}
                    disabled={loading}
                    color="primary"
                    expanded={changePassword}
                    onChange={(e, expand) => setChangePassword(expand)}
                >
                    <AccordionSummary>Change Password</AccordionSummary>
                    <Box component={AccordionDetails} flexDirection="column">
                        <TextFieldWrapper
                            required
                            label="New Password"
                            name="newPassword"
                            type="password"
                            error={passwordCheck}
                            value={state.newPassword}
                            disabled={loading}
                            placeholder="Minimum 6 characters "
                            autoComplete="new-password"
                            onChange={handleUpdateState}
                        />
                        <TextFieldWrapper
                            required
                            label="Confirm Password"
                            name="confirmPassword"
                            error={confirmPasswordCheck}
                            type="password"
                            autoComplete="new-password"
                            value={state.confirmPassword}
                            disabled={loading}
                            onChange={handleUpdateState}
                        />
                        <TextFieldWrapper
                            required
                            label="Current Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={state.password}
                            disabled={loading}
                            onChange={handleUpdateState}
                        />
                    </Box>
                </Accordion>
            </Box>
            <br />

            <ErrorDisplayer errors={errors} />
            <br />
            <Grid container alignContent="center" alignItems="center">
                <Grid item xs>
                    {loading ? (
                        <LinearProgress style={progessBarStyle} />
                    ) : (
                        <Tooltip title="Undo All" color="secondary" onClick={handleToggleEdit()}>
                            <IconButton>
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading || !canSave}
                        onClick={dispatch(handleUpdateAccount(changePassword))}
                    >
                        {loading ? "Processing..." : "Save"}
                    </Button>
                </Grid>
            </Grid>

            <AddCardModal
                open={openAddCardModal}
                handleClose={() => setOpenAddCardModal(false)}
                handleAdd={paymentInfo => {
                    dispatch(handleAddNewCard(paymentInfo));
                }}
            />
        </form>
    );
};

export default ProfileEdit;
