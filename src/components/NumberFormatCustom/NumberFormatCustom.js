import React, { Component, Fragment } from 'react';
import { NumericFormat } from 'react-number-format';


const NumberFormatCustom = (props) => {
    const { value, withIntrinsicColor, instrument, colorCalcValue, shortForm, decimalScale, digit, suffix, prefix, isFormatZero, fitText, renderfitText, dataField } = props

    let _className = ""

    const getValue = (value) => {
        let returnValue = value ? value : 0;
        // if (value) {
        //     // returnValue = decimalScale && value || (shortForm && value ? (value / 1000).toFixed(digit ? digit : 2) : value)
        //     let numb = parseFloat(value);
        //     if (shortForm && numb) { // hiển thị dạng rút gọn hay không 
        //         if (isNotThousand) { // Nếu không phải đơn vị nghìn ==> Không phải chia 1000
        //             numb = +numb.toFixed(decimalScale || 2);
        //         } else {
        //             numb = numb / 1000;
        //             numb = +numb.toFixed(decimalScale || 2);
        //         }
        //     }
        //     returnValue = numb;
        // } else if (isFormatZero) {
        //     // returnValue = 0
        //     // returnValue = decimalScale || (shortForm && returnValue ? (returnValue / 1000).toFixed(digit ? digit : 2) : returnValue.toFixed(digit ? digit : 2))
        //     returnValue = '0.00'
        // } else {
        //     returnValue = '';
        // }
        return returnValue;
    }

    return (
        <Fragment>
            <NumericFormat
                value={getValue(value)}
                displayType={'text'}
                renderText={fitText && renderfitText ? renderfitText : null}
                decimalScale={decimalScale ? decimalScale : 0}
                fixedDecimalScale={false}
                thousandSeparator={','}
                decimalSeparator={'.'}
                suffix={suffix ? suffix : ""}
                prefix={prefix ? prefix : ""}
                className={_className}
            />
        </Fragment>
    );
}

export default NumberFormatCustom;
