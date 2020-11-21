import { IconButton, InputAdornment } from "@material-ui/core";
import TextFieldWrapper from "common/TextFieldWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { addRule } from "./orderRuleSlice";
import AddIcon from "@material-ui/icons/Add";

const AddNewRule = ({ rules }) => {
    const dispatch = useDispatch();
    const [newRuleName, setNewRuleName] = React.useState("");

    const lower = newRuleName.toLowerCase();
    const isValid = !(newRuleName in rules);
    return (
        <TextFieldWrapper
            value={newRuleName}
            label="New Rule"
            error={!isValid && "The rule already exited"}
            onChange={e => {
                setNewRuleName(e.target.value);
            }}
            InputProps={
                isValid && newRuleName
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                      onClick={e => {
                                          setNewRuleName("");
                                          dispatch(addRule(newRuleName));
                                      }}
                                  >
                                      <AddIcon />
                                  </IconButton>
                              </InputAdornment>
                          )
                      }
                    : undefined
            }
        />
    );
};

export default AddNewRule;
