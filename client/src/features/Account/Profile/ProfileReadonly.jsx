import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { handleLogout } from "../accountSlice";
import TextFieldWrapper from "common/components/TextFieldWrapper";
import { getDateStr } from "common";
import CardList from "features/CreditCard/CardList";

const ProfileReadonly = ({ accountInfo }) => {
    const dispatch = useDispatch();

    return (
        <>
            <TextFieldWrapper label="Name" value={accountInfo.name} disabled solid />
            <TextFieldWrapper phoneMask label="Phone Number" value={accountInfo.phone} disabled solid />
            <TextFieldWrapper label="Register Date" value={getDateStr(accountInfo.createdOn)} disabled solid />

            <Accordion elevation={5}>
                <AccordionSummary>
                    <Box flexGrow="1"> Manage Credit Cards</Box>
                    <Chip size="small" label={accountInfo.cards.length} />
                </AccordionSummary>
                <AccordionDetails>
                    {accountInfo.cards.length > 0 ? (
                        <CardList account={accountInfo} />
                    ) : (
                        <Typography variant="caption">Empty...</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            <br />
            <br />

            <Button type="submit" fullWidth variant="contained" onClick={dispatch(handleLogout)}>
                Sign Out
            </Button>
        </>
    );
};

export default ProfileReadonly;
