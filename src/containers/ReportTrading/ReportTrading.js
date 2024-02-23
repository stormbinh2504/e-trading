import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../../utils/imageUpload'
import { sdkVNPTService, authService, apiBinance } from '../../../services';
import { compressImage } from "../../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { loginStart, loginSucess, loginFail } from '../../../redux/actions/userActions'
import { alertType } from '../../../redux/actions/alertActions'
import { ToastUtil } from '../../../utils'
import { postDataAPI } from '../../../utils/fetchData'

import "./Report.scss"
import axios from 'axios';

const Report = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [dataSymbol, setDataSymbol] = useState([])

    useEffect(() => {
        fetchInfoSymbol();
    }, []);


    const fetchInfoSymbol = async () => {
        const symbol = 'ZENUSDT'; // Replace 'ZENUSDT' with the symbol you want to get volume data for
        const interval = '1d'; // Daily interval
        const startTime = Date.now() - (7 * 24 * 60 * 60 * 1000); // Start time (7 days ago)
        const endTime = Date.now(); // End time (current time)

        let body = {
            symbol, interval, startTime, endTime
        }

        dispatch(alertType(true))
        await apiBinance.getInfoSymbol(body)
            .then(data => {
                if (data && data.length > 0) {
                    data = _.map(data, (item, index) => {
                        return {
                            ...item,
                            symbol: symbol
                        }
                    })
                    setDataSymbol(data)
                    dispatch(alertType(false))
                    ToastUtil.success("Đăng nhập thành công");
                }
            })
            .catch(error => {
                dispatch(loginFail())
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Đăng nhập không thành công");
            });
    }

    console.log("Report", dataSymbol)
    return (
        <div div className='report' >

        </div >
    )
}

export default Report