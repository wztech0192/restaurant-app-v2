import React from "react";
import NumberFormat from "react-number-format";

export default function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                let num = parseFloat(values.value);
                if (isNaN(num)) {
                    num = 0.0;
                }
                onChange({
                    target: {
                        name: props.name,
                        value: num
                    }
                });
            }}
            isNumericString
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
        />
    );
}
