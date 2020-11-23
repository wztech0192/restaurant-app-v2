import { CircularProgress, IconButton, InputAdornment } from "@material-ui/core";
import TextFieldWrapper from "common/components/TextFieldWrapper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddRule } from "./orderRuleSlice";
import AddIcon from "@material-ui/icons/Add";
import { getLoading } from "app/Indicator/indicatorSlice";

const AddNewRule = ({ rules }) => {
    const dispatch = useDispatch();
    const [newRuleName, setNewRuleName] = React.useState("");
    const loading = useSelector(getLoading("addNewRule"));
    const isValid = !(newRuleName.toLowerCase() in rules);
    return (
        <>
            <TextFieldWrapper
                variant="standard"
                value={newRuleName}
                disabled={loading}
                label="Create New Rule"
                error={!isValid && "The rule already exited"}
                onChange={e => {
                    setNewRuleName(e.target.value);
                }}
                InputProps={
                    isValid && newRuleName
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      {loading ? (
                                          <CircularProgress size="24px" />
                                      ) : (
                                          <IconButton
                                              disabled={loading}
                                              onClick={dispatch(
                                                  handleAddRule(newRuleName, () => {
                                                      setNewRuleName("");
                                                  })
                                              )}
                                          >
                                              <AddIcon />
                                          </IconButton>
                                      )}
                                  </InputAdornment>
                              )
                          }
                        : undefined
                }
            />
        </>
    );
};

export default AddNewRule;
