import React, { useState, useEffect } from 'react'
import './YearPickerCustom.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CommonUtils } from '../../utils';
const YearPickerCustom = (props) => {
    const { date, onChange, dateFormatValue } = props
    // const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [startDate, setStartDate] = useState(null);


    useEffect(() => {
        setStartDate(date);
    }, []);

    useEffect(() => {
        onChange(startDate)
    }, [startDate]);

    return (
        <div className="date-picker-custom">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearPicker
                dateFormat="yyyy"
            />
        </div>
    )
}


export default YearPickerCustom