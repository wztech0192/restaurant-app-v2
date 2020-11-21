import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Grow,
    Switch,
    Typography
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch } from "react-redux";
import { handleUpdateRuleMetadata, removeRule } from "./orderRuleSlice";
import TimeRangeSelector from "./TimeRangeSelector";

const SingleRule = ({ rule, classes }) => {
    const dispatch = useDispatch();
    const dispatchUpdateRuleMetadata = dispatch(handleUpdateRuleMetadata(rule.name));
    return (
        <Grow in>
            <Accordion>
                <AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.header}>{rule.name}</Typography>
                    <Switch
                        color="primary"
                        checked={rule.activeTarget}
                        name="activeTarget"
                        onClick={e => {
                            e.stopPropagation();
                            dispatchUpdateRuleMetadata(e.target.name, e.target.value);
                        }}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Box width="100%">
                        <Divider />
                        <br />
                        <Typography variant="subtitle2">Available Time Range</Typography>

                        {rule.activeTimes.length > 0 &&
                            rule.activeTimes.map((timeRule, i) => (
                                <TimeRangeSelector
                                    key={i}
                                    timeRule={timeRule}
                                    onChange={e => {
                                        console.log(e.target.value);
                                        dispatchUpdateRuleMetadata(
                                            "activeTimes",
                                            rule.activeTimes.map((tr, tri) =>
                                                tri === i
                                                    ? {
                                                          ...tr,
                                                          [e.target.name]: e.target.value
                                                      }
                                                    : tr
                                            )
                                        );
                                    }}
                                />
                            ))}
                    </Box>
                </AccordionDetails>
                <AccordionActions>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => {
                            dispatchUpdateRuleMetadata("activeTimes", [
                                ...rule.activeTimes,
                                { days: [], start: "", stop: "" }
                            ]);
                        }}
                    >
                        Add Time
                    </Button>
                    <Button
                        color="secondary"
                        size="small"
                        onClick={e => dispatch(removeRule(rule.name))}
                    >
                        Remove Rule
                    </Button>
                </AccordionActions>
            </Accordion>
        </Grow>
    );
};

export default SingleRule;
