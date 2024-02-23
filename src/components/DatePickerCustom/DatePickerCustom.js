import React, { useState, useEffect } from 'react'
import './DatePickerCustom.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CommonUtils } from '../../utils';
const DatePickerCustom = (props) => {
    const { date, onChange, dateFormatValue } = props
    // const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [startDate, setStartDate] = useState(null);


    useEffect(() => {
        console.log("DatePickerCustom_useEffect1", { date1: date })
        // if (date) {
        let _date = startDate
        _date = CommonUtils.convertDateApiToDate(date) || null
        console.log("DatePickerCustom_useEffect2", { date1: _date })
        setStartDate(_date);
        // }
    }, [date]);

    const handleDateChange = (date) => {
        // setStartDate(date);
        console.log("binh_handleDateChange1", { date1: date })
        let _date = startDate
        _date = CommonUtils.convertDateToDateApi(date) || null
        console.log("binh_handleDateChange2", { date1: date, date2: _date })
        // onChange(_date)
        onChange(_date)

    }


    function convertUTCToLocalDate(date) {
        if (!date) {
            return date
        }
        date = new Date(date)
        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
        return date
    }

    function convertLocalToUTCDate(date) {
        if (!date) {
            return date
        }
        date = new Date(date)
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        return date
    }


    let dateFormat = dateFormatValue ? dateFormatValue : "dd/MM/yyyy"
    return (
        <div className="date-picker-custom">
            <DatePicker
                selected={startDate} //https://github.com/Hacker0x01/react-datepicker/issues/1787#top
                onChange={date => handleDateChange(convertLocalToUTCDate(date))}
                // selected={convertUTCToLocalDate(startDate)}
                dateFormat={dateFormat}
                // placeholderText="Click to select a date"
                className="class-date-datepicker"
            />
        </div>
    )
}


export default DatePickerCustom