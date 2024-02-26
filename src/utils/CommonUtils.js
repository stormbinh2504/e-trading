import { useEffect } from "react";
import { push } from "connected-react-router";
import { reduxStore, dispatch } from "../../src/redux/store"
class CommonUtils {

    static checkLogined() {
        const state = reduxStore.getState();
        console.log("checkLogined3", state)
        let isLoggedIn = state.user.isLoggedIn;
        if (!isLoggedIn) {
            console.log("checkLogined4", state)
            dispatch(push("/login"))
            return false
        }
        return isLoggedIn;
    };

    static convertDateToDateApi(date) { // Thu May 25 2023 18:30:00 GMT+0700 (Indochina Time) {} => "2023-05-25T11:30:00"
        let _date = date
        console.log("binh_convertDateToDateApi", { _date, date })
        // _date.setUTCHours(0, 0, 0, 0);
        if (date) {
            _date = _date.toISOString().slice(0, 19)
            //  date.toISOString() = '2023-05-04T17:00:00.000Z'
            // date.toISOString().slice(0, 19) = '2023-05-04T17:00:00'
            console.log("binh_convertDateToDateApi2", _date)
            return _date
        }
    };


    static convertDateApiToDate(date) { //  '2023-05-04T17:00:00' => '2023-05-04T17:00:00.000Z'
        let _date = date
        console.log("binh_convertDateApiToDate1", _date)

        if (date) {
            _date = `${date}.000Z`
            let result = new Date(_date.slice(0, -1))
            // .setUTCHours(0, 0, 0, 0);
            console.log("binh_convertDateApiToDate2", { result, _date })
            return result
        }
    };


    static formatNumber(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };


    static formatDateCeateApi(date) { //"2023-07-01T04:57:52"
        if (date) {
            const _date = new Date(date);
            const formattedDate = _date.toLocaleDateString("en-GB"); // Change locale if needed
            return formattedDate
        }
        return ""
    };


    static getClassCheckValue = (value, isColor = false) => {
        let _value = Number(value)
        let _class = ""
        if (!value && isColor) {
            _class = "text-yellow"
        } else {
            if (_value > 0) {
                _class = "text-green"
            } else if (_value < 0) {
                _class = "text-red"
            } else if (_value == 0) {
                _class = "text-yellow"
            } else {
                _class = ""
            }
        }

        return _class
    }
}

export default CommonUtils;