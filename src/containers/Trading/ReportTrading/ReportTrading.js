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
import _ from 'lodash';
import moment from 'moment'
import "./ReportTrading.scss"
import axios from 'axios';
const listSymbol = ["ZENUSDT", "SUIUSDT"]

const ReportTrading = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [dataSymbol, setDataSymbol] = useState([])
    const [calValue, setCalValue] = useState({})
    const [dataGroupSymbol, setDataGroupSymbol] = useState({})

    useEffect(() => {
        fetchInfoSymbol();
    }, []);


    const fetchInfoSymbol = async () => {
        const interval = '1d'; // Daily interval
        const startTime = Date.now() - (7 * 24 * 60 * 60 * 1000); // Start time (7 days ago)
        const endTime = Date.now(); // End time (current time)

        let body = { interval, startTime, endTime }

        dispatch(alertType(true))
        _.forEach(listSymbol, async (symbol) => {
            body.symbol = symbol
            await apiBinance.getInfoSymbol(body)
                .then(data => {
                    if (data && data.length > 0) {
                        let totalVolume = 0
                        data = _.map(data, (item, index) => {
                            totalVolume += Number(item['5'])
                            return {
                                ...item,
                                symbol: symbol
                            }
                        })
                        calValue[symbol] = {
                            symbol: symbol,
                            totalVolume: totalVolume,
                            avgVolume: (totalVolume / 7),
                        }
                        console.log("fetchInfoSymbol", calValue, totalVolume / 7)
                        setDataSymbol((prev) => ([...prev, ...data]))
                        setCalValue(calValue)

                        dispatch(alertType(false))
                        ToastUtil.success("Đăng nhập thành công");
                    }
                })
                .catch(error => {
                    dispatch(loginFail())
                    dispatch(alertType(false))
                    ToastUtil.errorApi(error, "Đăng nhập không thành công");
                });
        })

    }

    useEffect(() => {
        let newDataGroupSymbol = _.groupBy(dataSymbol, 'symbol')
        setDataGroupSymbol(newDataGroupSymbol)
    }, [dataSymbol]);

    const formatTimeDate = (timestamp) => {
        return moment(timestamp).format('HH:mm:ss - DD/MM/YYYY') || "";
    }

    console.log("ReportTrading", dataSymbol, dataGroupSymbol, calValue)
    return (
        <div div className='report-trading' >
            <div className="report-trading-content">
                {listSymbol.map((item, index) => {
                    let infoSymbol = dataGroupSymbol[item] || []
                    return (
                        <div className="info-symbol">
                            <div className="info-header">
                                {item}
                            </div>
                            <div className="info-body">
                                {infoSymbol && infoSymbol.map((symbol, index) => {
                                    return (
                                        <div className="wrap-row-item">
                                            <div className="row-item">
                                                <div className="row-label">
                                                    Thời gian mở cửa:
                                                </div>
                                                <div className="row-value">
                                                    {formatTimeDate(symbol['0'])}
                                                </div>
                                            </div>
                                            <div className="row-item">
                                                <div className="row-label">
                                                    Thời gian đóng cửa:
                                                </div>
                                                <div className="row-value">
                                                    {formatTimeDate(symbol['6'])}
                                                </div>
                                            </div>
                                            <div className="row-item">
                                                <div className="row-label">
                                                    Khối lượng:
                                                </div>
                                                <div className="row-value">
                                                    {symbol['5']}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="info-footer">
                                <div className="total-volumn">
                                    Tổng khối lượng: {calValue[item] ? calValue[item].totalVolume : ""}
                                </div>
                                <div className="avg-volumn">
                                    Tổng khối lượng trung bình: {calValue[item] ? calValue[item].avgVolume : ""}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default ReportTrading