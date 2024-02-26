import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { KeyCodeUtils } from "../../../utils";
import "./NumberInput.scss"
import { connect } from 'react-redux';

// Fix theo src https://github.com/react-component/input-number/blob/4.5.x/src/index.js
function noop() {
}

function preventDefault(e) {
    e.preventDefault();
}

function insertEscapeIfNeed(separator) {
    if (separator === '.') {
        return '\\.';
    }
    return separator;
}

function defaultFormatter(value, decimalSeparator, groupSeparator, allowDecimal, allowDecimalNumb) {
    if (value == null || value === '') {
        return '';
    }

    if ("string" !== typeof value) {
        value = value.toString();
    }

    let result = value;

    if (allowDecimal) {
        result = decimalFormater(value, allowDecimalNumb, groupSeparator, decimalSeparator);
    } else {
        const parts = value.split(/[.]/gi);
        result = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gi, groupSeparator);
    }

    return result;
}

function decimalFormater(value, allowDecimalNumb, groupSeparator, decimalSeparator) {
    const parts = value.split(/[.]/gi);
    const hasDecimalSeparator = value.indexOf('.') >= 0;

    let result = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gi, groupSeparator);
    if (hasDecimalSeparator) {
        result += decimalSeparator;
        if (parts.length > 1) {
            if (allowDecimalNumb || allowDecimalNumb === 0) {
                if (allowDecimalNumb >= parts[1].length) {
                    result += parts[1];
                } else {
                    result += parts[1].substring(0, allowDecimalNumb);
                }
            } else {
                result += parts[1];
            }
        }
    }
    return result;
}

function defaultParser(input, decimalSeparator, groupSeparator, allowDecimal, allowNegative, allowDecimalNumb) {
    const unusedRegex = new RegExp('[^\\d-' + insertEscapeIfNeed(decimalSeparator) + insertEscapeIfNeed(groupSeparator) + ']+', 'gi');

    let result = input;

    // Remove any unrelated char
    result = result.replace(unusedRegex, '');

    // Remove dash if not allowNegative
    if (!allowNegative) {
        const dashRegex = /[-]+/i;
        result = result.replace(dashRegex, '');
    }

    // Remove group separator
    if (groupSeparator != null) {
        const groupSeparatorRegex = new RegExp('[' + insertEscapeIfNeed(groupSeparator) + ']', 'gi');
        result = result.replace(groupSeparatorRegex, '');
    }

    // Convert custom decimalSeparator to .
    if (allowDecimal) {
        const decimalSeparatorRegex = new RegExp('[' + insertEscapeIfNeed(decimalSeparator) + ']', 'gi');
        result = result.replace(decimalSeparatorRegex, '.');

        if (allowDecimalNumb && allowDecimalNumb !== 0) {
            const parts = result.split(/[.]/gi);
            let tmpResult = result;
            const decimalIndex = result.indexOf(decimalSeparator);
            if (decimalIndex >= 0) {
                let removeDecimal = tmpResult.substring(0, decimalIndex)
                tmpResult = String(parseFloat(removeDecimal) ? parseFloat(removeDecimal) : removeDecimal) + decimalSeparator;
            } else {
                // Logic cho truong hop co so 0 o dau (VD: 01654)
                tmpResult = parseFloat(tmpResult) ? parseFloat(tmpResult) : tmpResult;
            }
            if (parts.length > 1) {
                if (allowDecimalNumb >= parts[1].length) {
                    tmpResult += parts[1];
                } else {
                    tmpResult += parts[1].substring(0, allowDecimalNumb);
                }
            }
            result = tmpResult
        }
    } else {
        // Remove decimal part
        const decimalIndex = result.indexOf(decimalSeparator);
        if (decimalIndex >= 0) {
            result = result.substring(0, decimalIndex);
        }
    }
    return result;
}

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
const SPEED = 200;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
const DELAY = 600;

/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

const isValidProps = value => value !== undefined && value !== null;
class NumberInput extends React.Component {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        defaultValue: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        focusOnUpDown: PropTypes.bool,
        autoFocus: PropTypes.bool,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        prefixCls: PropTypes.string,
        tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        readOnly: PropTypes.bool,
        max: PropTypes.number,
        min: PropTypes.number,
        step: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        upHandler: PropTypes.node,
        downHandler: PropTypes.node,
        useTouch: PropTypes.bool,
        formatter: PropTypes.func,
        parser: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseOver: PropTypes.func,
        onMouseOut: PropTypes.func,
        onMouseUp: PropTypes.func,
        precision: PropTypes.number,
        required: PropTypes.bool,
        pattern: PropTypes.string,
        decimalSeparator: PropTypes.string,
        allowDecimalNumb: PropTypes.number,
        groupSeparator: PropTypes.string,
        allowDecimal: PropTypes.bool,
        allowNegative: PropTypes.bool
    };

    static defaultProps = {
        focusOnUpDown: true,
        useTouch: false,
        prefixCls: 'rc-input-number',
        min: -MAX_SAFE_INTEGER,
        step: 1,
        style: {},
        onChange: noop,
        onKeyDown: noop,
        onFocus: noop,
        onBlur: noop,
        formatter: defaultFormatter,
        parser: defaultParser,
        required: false,
        autoComplete: 'off',
        decimalSeparator: '.',
        groupSeparator: ',',
        allowDecimal: true,
        allowNegative: true,
        allowDecimalNumb: 0
    };

    constructor(props) {
        super(props);
        this.composing = undefined
        this.composingCheck = undefined
        let value;
        if ('value' in props) {
            value = props.value;
        } else {
            value = props.defaultValue;
        }
        this.state = {
            focused: props.autoFocus,
        };
        const validValue = this.getValidValue(this.toNumber(value));
        this.state = {
            ...this.state,
            inputValue: this.toPrecisionAsStep(validValue),
            value: validValue,
        };
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //validate khi value thay đổi
        if ('value' in nextProps) {
            const value = this.state.focused
                ? nextProps.value : this.getValidValue(nextProps.value, nextProps.min, nextProps.max);
            let nextInputValue;
            if (this.pressingUpOrDown) {
                nextInputValue = value;
            } else if (this.inputting) {
                nextInputValue = value;
            } else {
                nextInputValue = this.toPrecisionAsStep(value);
            }
            if (nextInputValue !== this.props.value) {
                this.setState({
                    value,
                    inputValue: nextInputValue,
                });

                if (nextProps.valid != null) {
                    const isValid = this.validate(nextInputValue, nextProps);
                    if (nextProps.valid !== isValid && nextProps.onChange != null) {
                        nextProps.onChange(nextInputValue, isValid);
                    }
                }
            }
        }

        // Trigger onChange when max or min change
        // https://github.com/ant-design/ant-design/issues/11574
        const nextValue = 'value' in nextProps ? nextProps.value : this.state.value;
        const { onChange, max, min } = this.props;
        // ref: null < 20 === true
        // https://github.com/ant-design/ant-design/issues/14277
        if ('max' in nextProps &&
            nextProps.max !== max &&
            typeof nextValue === 'number' &&
            nextValue > nextProps.max &&
            onChange) {
            onChange(nextProps.max, this.validate(nextProps.max, nextProps));
        }
        if ('min' in nextProps &&
            nextProps.min !== min &&
            typeof nextValue === 'number' &&
            nextValue < nextProps.min &&
            onChange) {
            onChange(nextProps.min, this.validate(nextProps.min, nextProps));
        }
    }

    componentDidUpdate() {
        // Restore cursor
        try {
            // Firefox set the input cursor after it get focused.
            // This caused that if an input didn't init with the selection,
            // set will cause cursor not correct when first focus.
            // Safari will focus input if set selection. We need skip this.
            if (this.cursorStart !== undefined && this.state.focused) {
                // In most cases, the string after cursor is stable.
                // We can move the cursor before it

                if (
                    // If not match full str, try to match part of str
                    !this.partRestoreByAfter(this.cursorAfter) && this.state.value !== this.props.value
                ) {
                    // If not match any of then, let's just keep the position
                    // TODO: Logic should not reach here, need check if happens
                    let pos = this.cursorStart + 1;

                    // If not have last string, just position to the end
                    if (!this.cursorAfter) {
                        pos = this.input.value.length;
                    } else if (this.lastKeyCode === KeyCodeUtils.BACKSPACE) {
                        pos = this.cursorStart - 1;
                    } else if (this.lastKeyCode === KeyCodeUtils.DELETE) {
                        pos = this.cursorStart;
                    }
                    this.fixCaret(pos, pos);
                } else if (this.currentValue === this.input.value) {
                    // Handle some special key code
                    switch (this.lastKeyCode) {
                        case KeyCodeUtils.BACKSPACE:
                            this.fixCaret(this.cursorStart - 1, this.cursorStart - 1);
                            break;
                        case KeyCodeUtils.DELETE:
                            this.fixCaret(this.cursorStart + 1, this.cursorStart + 1);
                            break;
                        default:
                        // Do nothing
                    }
                }
            }
        } catch (e) {
            // Do nothing
        }

        // Reset last key
        this.lastKeyCode = null;

        // pressingUpOrDown is true means that someone just click up or down button
        if (!this.pressingUpOrDown) {
            return;
        }
        if (this.props.focusOnUpDown && this.state.focused) {
            if (document.activeElement !== this.input) {
                this.focus();
            }
        }

        this.pressingUpOrDown = false;
    }

    componentWillUnmount() {
        this.stop();
    }

    onKeyDown = (e, ...args) => {
        const { onKeyDown, decimalSeparator } = this.props;

        if (e.keyCode === KeyCodeUtils.UP) {
            const ratio = this.getRatio(e);
            this.up(e, ratio);
            this.stop();
        } else if (e.keyCode === KeyCodeUtils.DOWN) {
            const ratio = this.getRatio(e);
            this.down(e, ratio);
            this.stop();
        }

        // Trigger user key down
        this.recordCursorPosition();
        this.lastKeyCode = e.keyCode;
        if (onKeyDown) {
            onKeyDown(e, ...args);
        }

        const key = e.which || e.keyCode;
        const numberString = "string" === typeof e.target.value ? e.target.value : "0";
        const isNavigationKey = KeyCodeUtils.isNavigation(key);
        const isDecimalKey = KeyCodeUtils.isDecimal(key) && e.key === decimalSeparator;
        const isNumericKey = KeyCodeUtils.isNumeric(key);
        const isDashKey = KeyCodeUtils.isDash(key);
        const isNotContainDecimal = !(new RegExp('[\\' + decimalSeparator + ']').test(numberString));

        if (!isDecimalKey || (this.props.allowDecimal && isNotContainDecimal)) {
            if (!this.props.allowNegative && isDashKey) {
                e.preventDefault();
            } else if (isDashKey && Number(numberString) < 0) {
                e.preventDefault();
            } else {
                const keyAllowed = e.ctrlKey || e.metaKey || isNumericKey || isNavigationKey || isDecimalKey || isDashKey;
                if (!keyAllowed) {
                    e.preventDefault();
                }
            }
        } else {
            e.preventDefault();
        }
    };

    onKeyUp = (e, ...args) => {
        const { onKeyUp } = this.props;

        this.stop();

        this.recordCursorPosition();

        // Trigger user key up
        if (onKeyUp) {
            onKeyUp(e, ...args);
        }
    };

    onChange = (e) => {
        const {
            onChange, decimalSeparator, groupSeparator, allowDecimal, allowNegative, allowDecimalNumb
        } = this.props;

        if (this.state.focused) {
            this.inputting = true;
        }
        this.rawInput = this.props.parser(this.getValueFromEvent(e), decimalSeparator, groupSeparator, allowDecimal, allowNegative, allowDecimalNumb);
        let num = 0;
        // Cho phép nhập số thập phân (Bao gồm 12.05 )
        if (allowDecimal) {
            num = this.rawInput;
        } else {
            num = this.toNumber(this.rawInput);
        }
        // Haki.: Check Min Max
        num = this.getValidValue(num);
        this.setState({
            // inputValue: this.rawInput,
            inputValue: this.rawInput ? this.rawInput + ' ' : this.rawInput, // Haki.:Fix lỗi cho VI-Telex
        }, () => {
            // if (!this.composing) {
            onChange(num, this.validate(num, this.props)); // valid number or invalid string
            (this.rawInput && this.rawInput.replace) && this.setState({
                inputValue: this.rawInput.replace(' ', ''), // Haki.:[END].:Fix lỗi cho VI-Telex: Tự động xóa dấu space
            });
            // }
        });
    };

    onMouseUp = (...args) => {
        const { onMouseUp } = this.props;

        this.recordCursorPosition();

        if (onMouseUp) {
            onMouseUp(...args);
        }
    };

    onFocus = (...args) => {
        if (this.composingCheck != undefined) {
            this.composing = true;
        }
        this.state.focused = true;
        this.setState({
            focused: this.state.focused,
        });
        this.props.onFocus(...args);
    };

    onBlur = (...args) => {
        if (this.composingCheck != undefined) {
            this.composing = false;
        }
        const { onBlur } = this.props;
        this.inputting = false;
        this.state.focused = false;
        this.setState({
            focused: this.state.focused,
        });
        const value = this.getCurrentValidValue(this.state.inputValue);
        const newValue = this.setValue(value);

        if (onBlur) {
            const originValue = this.input.value;
            const inputValue = this.getInputDisplayValue({ focus: false, value: newValue });
            this.input.value = inputValue;
            onBlur(...args);
            this.input.value = originValue;
        }
    }

    onComposition = (e) => {
        // console.log('Haki1.:onComposition 1=', e.type, e.data, e.target.value)
        this.composingCheck = true;
        if (e.type === 'compositionstart' || e.type === 'compositionupdate') {
            this.composing = true;
        } else if (e.type === 'compositionend') {
            this.composing = false;
            // this.onChange(e);
        }
    }
    onKeyPressDiv = () => {
        // console.log('Haki.:onKeyPressDiv')
        this.composing = undefined;
        this.composingCheck = undefined;
    }

    getCurrentValidValue(value) {
        let val = value;
        if (val === '') {
            val = '';
        } else if (!this.isNotCompleteNumber(parseFloat(val, 10))) {
            val = this.getValidValue(val);
        } else {
            val = this.state.value;
        }
        return this.toNumber(val);
    }

    getRatio(e) {
        let ratio = 1;
        if (e.metaKey || e.ctrlKey) {
            ratio = 0.1;
        } else if (e.shiftKey) {
            ratio = 10;
        }
        return ratio;
    }

    getValueFromEvent(e) {
        // optimize for chinese input expierence
        // https://github.com/ant-design/ant-design/issues/8196
        return e.target.value.trim().replace(/。/g, '.');
    }

    getValidValue(value, min = this.props.min, max = this.props.max) {
        let val = parseFloat(value, 10);
        // https://github.com/ant-design/ant-design/issues/7358
        if (isNaN(val)) {
            return value;
        }
        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }
        return val;
    }

    setValue(v, callback) {
        // trigger onChange
        const { precision } = this.props;
        const newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? null : parseFloat(v, 10);
        const { value = null, inputValue = null } = this.state;
        // https://github.com/ant-design/ant-design/issues/7363
        // https://github.com/ant-design/ant-design/issues/16622
        const newValueInString = typeof newValue === 'number'
            ? newValue.toFixed(precision) : `${newValue}`;
        const changed = newValue !== value || newValueInString !== `${inputValue}`;
        if (!('value' in this.props)) {
            this.setState({
                value: newValue,
                inputValue: this.toPrecisionAsStep(v),
            }, callback);
        } else {
            // always set input value same as value
            this.setState({
                inputValue: this.toPrecisionAsStep(this.state.value),
            }, callback);
        }
        if (changed) {
            this.props.onChange(newValue, this.validate(newValue, this.props));
        }

        return newValue;
    }
    ValidateByMarketType = (value) => {
        if (value == null) {
            return false;
        }

        if ("string" !== typeof value) {
            value = value.toString();
        }
        const props = this.props;
        const numberValue = parseFloat(value);

        const valueInvalid = !value.length || value.split(".").length > 2
            || (!props.allowZero && numberValue === 0)
            || (!props.allowDecimal && numberValue !== parseInt(value, 10));
        if (this.props.instrument) {
            let lot = parseInt(value);
            return (lot >= 100) && (lot % 100 == 0) || (lot === 0);        // trường hợp lô đặt lệnh lớn hơn 100(đơn vị lô) thì check đúng lô giao dịch, đối với lô nhỏ hơn 100 thì là case đặt lệnh lô lẻ
        }
        return !valueInvalid;
    }

    //truyen props de biet validate voi this props hay next props
    validate = (value, props) => {
        if (value == null) {
            return false;
        }

        if ("string" !== typeof value) {
            value = value.toString();
        }
        const numberValue = parseFloat(value);

        const valueInvalid = !value.length || value.split(".").length > 2
            || (!props.allowZero && numberValue === 0)
            || (!props.allowDecimal && numberValue !== parseInt(value, 10));
        return !valueInvalid;
    };

    getPrecision(value) {
        if (isValidProps(this.props.precision)) {
            return this.props.precision;
        }
        const valueString = value.toString();
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
        }
        let precision = 0;
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1;
        }
        return precision;
    }

    // step={1.0} value={1.51}
    // press +
    // then value should be 2.51, rather than 2.5
    // if this.props.precision is undefined
    // https://github.com/react-component/input-number/issues/39
    getMaxPrecision(currentValue, ratio = 1) {
        if (isValidProps(this.props.precision)) {
            return this.props.precision;
        }
        const step = this.props.step;
        const ratioPrecision = this.getPrecision(ratio);
        const stepPrecision = this.getPrecision(step);
        const currentValuePrecision = this.getPrecision(currentValue);
        if (!currentValue) {
            return ratioPrecision + stepPrecision;
        }
        return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    }

    getPrecisionFactor(currentValue, ratio = 1) {
        const precision = this.getMaxPrecision(currentValue, ratio);
        return Math.pow(10, precision);
    }

    getInputDisplayValue = (state) => {
        const { focused, inputValue, value } = state || this.state;
        let inputDisplayValue;
        if (focused) {
            inputDisplayValue = inputValue;
        } else {
            inputDisplayValue = this.toPrecisionAsStep(value);
        }

        if (inputDisplayValue === undefined || inputDisplayValue === null) {
            inputDisplayValue = '';
        }
        let inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
        if (isValidProps(this.props.decimalSeparator)) {
            inputDisplayValueFormat = inputDisplayValueFormat
                .toString()
                .replace('.', this.props.decimalSeparator);
        }

        return inputDisplayValueFormat;
    };

    recordCursorPosition = () => {
        // Record position
        try {
            this.cursorStart = this.input.selectionStart;
            this.cursorEnd = this.input.selectionEnd;
            this.currentValue = this.input.value;
            this.cursorBefore = this.input.value.substring(0, this.cursorStart);
            this.cursorAfter = this.input.value.substring(this.cursorEnd);
        } catch (e) {
            // Fix error in Chrome:
            // Failed to read the 'selectionStart' property from 'HTMLInputElement'
            // http://stackoverflow.com/q/21177489/3040605
        }
    };

    fixCaret(start, end) {
        if (start === undefined || end === undefined || !this.input || !this.input.value) {
            return;
        }

        try {
            const currentStart = this.input.selectionStart;
            const currentEnd = this.input.selectionEnd;

            if (start !== currentStart || end !== currentEnd) {
                this.input.setSelectionRange(start, end);
            }
        } catch (e) {
            // Fix error in Chrome:
            // Failed to read the 'selectionStart' property from 'HTMLInputElement'
            // http://stackoverflow.com/q/21177489/3040605
        }
    }

    restoreByAfter = (str) => {
        if (str === undefined) return false;

        const fullStr = this.input.value;
        const index = fullStr.lastIndexOf(str);

        if (index === -1) return false;

        const prevCursorPos = this.cursorBefore.length;
        if (this.lastKeyCode === KeyCodeUtils.DELETE &&
            this.cursorBefore.charAt(prevCursorPos - 1) === str[0]) {
            this.fixCaret(prevCursorPos, prevCursorPos);
            return true;
        }
        if (index + str.length === fullStr.length) {
            this.fixCaret(index, index);

            return true;
        }
        return false;
    };

    partRestoreByAfter = (str) => {
        if (str === undefined) return false;

        // For loop from full str to the str with last char to map. e.g. 123
        // -> 123
        // -> 23
        // -> 3
        return Array.prototype.some.call(str, (_, start) => {
            const partStr = str.substring(start);

            return this.restoreByAfter(partStr);
        });
    };

    focus() {
        this.input.focus();
        this.recordCursorPosition();
    }

    blur() {
        this.input.blur();
    }

    formatWrapper(num) {
        // http://2ality.com/2012/03/signedzero.html
        // https://github.com/ant-design/ant-design/issues/9439
        const {
            formatter, decimalSeparator, groupSeparator, allowDecimalNumb, allowDecimal
        } = this.props;

        if (formatter) {
            return formatter(num, decimalSeparator, groupSeparator, allowDecimal, allowDecimalNumb);
        }
        return num;
    }

    toPrecisionAsStep(num) {
        if (this.isNotCompleteNumber(num) || num === '') {
            return num;
        }
        const precision = Math.abs(this.getMaxPrecision(num));
        if (precision === 0) {
            return num.toString();
        }
        if (!isNaN(precision)) {
            return Number(num).toFixed(precision);
        }
        return num.toString();
    }

    // '1.' '1x' 'xx' '' => are not complete numbers
    isNotCompleteNumber(num) {
        return (
            isNaN(num) ||
            num === '' ||
            num === null ||
            (num && num.toString().indexOf('.') === num.toString().length - 1)
        );
    }

    toNumber(num) {
        const { precision } = this.props;
        const { focused } = this.state;
        // num.length > 16 => This is to prevent input of large numbers
        const numberIsTooLarge = num && num.length > 16 && focused;
        if (this.isNotCompleteNumber(num) || numberIsTooLarge) {
            return num;
        }
        if (isValidProps(precision)) {
            return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
        }
        return Number(num);
    }

    upStep(val, rat) {
        const step = this.props.step;
        const precisionFactor = this.getPrecisionFactor(val, rat);
        const precision = Math.abs(this.getMaxPrecision(val, rat));
        const result =
            ((precisionFactor * val + precisionFactor * step * rat) /
                precisionFactor).toFixed(precision);
        return this.toNumber(result);
    }

    downStep(val, rat) {
        const step = this.props.step;
        const precisionFactor = this.getPrecisionFactor(val, rat);
        const precision = Math.abs(this.getMaxPrecision(val, rat));
        const result =
            ((precisionFactor * val - precisionFactor * step * rat) /
                precisionFactor).toFixed(precision);
        return this.toNumber(result);
    }

    step(type, e, ratio = 1, recursive) {
        this.stop();
        if (e) {
            e.persist();
            e.preventDefault();
        }
        const props = this.props;
        if (props.disabled) {
            return;
        }
        const value = this.getCurrentValidValue(this.state.inputValue) || 0;
        if (this.isNotCompleteNumber(value)) {
            return;
        }
        let val = this[`${type}Step`](value, ratio);
        const outOfRange = val > props.max || val < props.min;
        if (val > props.max) {
            val = props.max;
        } else if (val < props.min) {
            val = props.min;
        }
        this.setValue(val);
        this.setState({
            focused: true,
        });
        if (outOfRange) {
            return;
        }
        this.autoStepTimer = setTimeout(() => {
            this[type](e, ratio, true);
        }, recursive ? SPEED : DELAY);
    }

    stop = () => {
        if (this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
    };

    down = (e, ratio, recursive) => {
        this.pressingUpOrDown = true;
        this.step('down', e, ratio, recursive);
    };

    up = (e, ratio, recursive) => {
        this.pressingUpOrDown = true;
        this.step('up', e, ratio, recursive);
    };

    saveUp = (node) => {
        this.upHandler = node;
    };

    saveDown = (node) => {
        this.downHandler = node;
    };

    saveInput = (node) => {
        this.input = node;
    };

    render() {
        const props = { ...this.props };
        const {
            prefixCls, disabled, readOnly, useTouch, autoComplete,
            upHandler, downHandler, inputClassName, forwardRef, hideFocused
        } = props;
        const classes = classNames({
            [prefixCls]: true,
            [props.className]: !!props.className,
            [`${prefixCls}-disabled`]: disabled,
            // [`${prefixCls}-focused`]: this.state.focused,
        });
        let upDisabledClass = '';
        let downDisabledClass = '';
        const { value, inputValue } = this.state;
        if (value || value === 0) {
            if (!isNaN(value)) {
                const val = Number(value);
                if (val >= props.max) {
                    upDisabledClass = `${prefixCls}-handler-up-disabled`;
                }
                if (val <= props.min) {
                    downDisabledClass = `${prefixCls}-handler-down-disabled`;
                }
            } else {
                upDisabledClass = `${prefixCls}-handler-up-disabled`;
                downDisabledClass = `${prefixCls}-handler-down-disabled`;
            }
        }

        const dataOrAriaAttributeProps = {};
        for (const key in props) {
            if (
                props.hasOwnProperty(key) &&
                (
                    key.substr(0, 5) === 'data-' ||
                    key.substr(0, 5) === 'aria-' ||
                    key === 'role'
                )
            ) {
                dataOrAriaAttributeProps[key] = props[key];
            }
        }

        const editable = !props.readOnly && !props.disabled;

        // focus state, show input value
        // unfocus state, show valid value
        const inputDisplayValue = this.composing ? inputValue : this.getInputDisplayValue();
        let upEvents;
        let downEvents;
        if (useTouch) {
            upEvents = {
                onTouchStart: (editable && !upDisabledClass) ? this.up : noop,
                onTouchEnd: this.stop,
            };
            downEvents = {
                onTouchStart: (editable && !downDisabledClass) ? this.down : noop,
                onTouchEnd: this.stop,
            };
        } else {
            upEvents = {
                onMouseDown: (editable && !upDisabledClass) ? this.up : noop,
                onMouseUp: this.stop,
                onMouseLeave: this.stop,
            };
            downEvents = {
                onMouseDown: (editable && !downDisabledClass) ? this.down : noop,
                onMouseUp: this.stop,
                onMouseLeave: this.stop,
            };
        }

        const isUpDisabled = !!upDisabledClass || disabled || readOnly;
        const isDownDisabled = !!downDisabledClass || disabled || readOnly;
        // ref for test
        return (
            <div
                className={classes}
                style={props.style}
                title={props.title}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut}
                onCompositionStart={this.onComposition}
                onCompositionEnd={this.onComposition}
                onCompositionUpdate={this.onComposition}
                onKeyPress={this.onKeyPressDiv}
            >
                <div
                    className={`${prefixCls}-input-wrap`}
                    role="spinbutton"
                    aria-valuemin={props.min}
                    aria-valuemax={props.max}
                    aria-valuenow={value}
                >
                    <input
                        required={props.required}
                        type="text"
                        inputMode="numeric"
                        placeholder={props.placeholder}
                        onClick={props.onClick}
                        onMouseUp={this.onMouseUp}
                        className={`${prefixCls}-input` + (inputClassName ? ' ' + inputClassName : '')}
                        tabIndex={props.tabIndex}
                        autoComplete={autoComplete}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onKeyDown={editable ? this.onKeyDown : noop}
                        onKeyUp={editable ? this.onKeyUp : noop}
                        autoFocus={props.autoFocus}
                        maxLength={props.maxLength}
                        readOnly={props.readOnly}
                        disabled={props.disabled}
                        max={props.max}
                        min={props.min}
                        step={props.step}
                        name={props.name}
                        id={props.id}
                        onChange={this.onChange}
                        ref={this.saveInput}
                        value={inputDisplayValue}
                        pattern="[-]?[0-9.,]*[.,]?[0-9]+"
                        {...dataOrAriaAttributeProps}
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, null, null, { forwardRef: true })(NumberInput);