import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Fade,
    Grow,
    LinearProgress,
    Switch,
    Typography
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateRuleMetadata, handleRemoveRule } from "./orderRuleSlice";
import TimeRangeSelector from "./TimeRangeSelector";
import { getLoading } from "app/Indicator/indicatorSlice";

const SingleRule = ({ rule, classes }) => {
    const loading = useSelector(getLoading(`rule-${rule.name}`));
    const dispatch = useDispatch();
    const dispatchUpdateRuleMetadata = dispatch(handleUpdateRuleMetadata(rule));
    return (
        <Grow in>
            <Accordion elevation={6}>
                <AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                    <Box flexGrow="1" className={classes.header}>
                        <Typography>
                            <b>{rule.name}</b>
                        </Typography>
                        <Fade in={loading}>
                            <LinearProgress />
                        </Fade>
                    </Box>

                    <Switch
                        disabled={loading}
                        color="primary"
                        checked={rule.activeTarget}
                        name="activeTarget"
                        onClick={e => {
                            e.stopPropagation();
                            dispatchUpdateRuleMetadata(e.target.name, e.target.checked);
                        }}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Box width="100%">
                        <Divider />

                        <br />

                        {rule.activeTimes.length > 0 ? (
                            <>
                                <Typography variant="subtitle2">Available Time Range</Typography>
                                {rule.activeTimes.map((timeRule, i) => (
                                    <TimeRangeSelector
                                        loading={loading}
                                        key={i}
                                        timeRule={timeRule}
                                        onRemove={() => {
                                            dispatchUpdateRuleMetadata(
                                                "activeTimes",
                                                rule.activeTimes.filter((tr, tri) => tri !== i)
                                            );
                                        }}
                                        onChange={newState => {
                                            dispatchUpdateRuleMetadata(
                                                "activeTimes",
                                                rule.activeTimes.map((tr, tri) => (tri === i ? newState : tr))
                                            );
                                        }}
                                    />
                                ))}
                            </>
                        ) : (
                            <Typography variant="subtitle2">Available Any Time</Typography>
                        )}
                    </Box>
                </AccordionDetails>
                <AccordionActions>
                    <Button
                        disabled={loading}
                        size="small"
                        color="primary"
                        onClick={() => {
                            dispatchUpdateRuleMetadata("activeTimes", [
                                ...rule.activeTimes,
                                { daysOfWeek: [], start: "", stop: "" }
                            ]);
                        }}
                    >
                        Add Availble Time Rule
                    </Button>
                    <Button
                        disabled={loading}
                        color="secondary"
                        size="small"
                        onClick={dispatch(handleRemoveRule(rule.name))}
                    >
                        Remove Rule
                    </Button>
                </AccordionActions>
                <Fade in={loading}>
                    <LinearProgress />
                </Fade>
            </Accordion>
        </Grow>
    );
};

export default SingleRule;
