import { EMPTY_ARRAY, EMPTY_OBJECT } from "common";
import React from "react";
import { useDispatch } from "react-redux";
import OptionSelectField from "./OptionSelectField";
import SideOrderSelector from "./SideOrderSelector";

const OptionsEditor = ({
    optionGroupNames = EMPTY_ARRAY,
    canAddSides,
    orderedOptions = EMPTY_OBJECT,
    menu,
    optionPriceMultiplier
}) => {
    const dispatch = useDispatch();
    console.log(menu);
    return (
        <div>
            {optionGroupNames.map((groupName, i) => {
                const selectedKey = `${groupName}-${i}`;
                return (
                    <OptionSelectField
                        optionPriceMultiplier={optionPriceMultiplier}
                        key={selectedKey}
                        selectedKey={selectedKey}
                        dispatch={dispatch}
                        options={menu.optionGroups[groupName]}
                        groupName={groupName}
                        selectedOption={orderedOptions[selectedKey]}
                    />
                );
            })}

            {canAddSides && (
                <SideOrderSelector
                    sideOrders={menu.optionGroups["side orders"]}
                    defaultExpanded={optionGroupNames.length <= 0}
                    orderedOptions={orderedOptions}
                    dispatch={dispatch}
                />
            )}
        </div>
    );
};

export default React.memo(OptionsEditor);
