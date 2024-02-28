import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../../utils/imageUpload'
import { sdkVNPTService, authService, apiBinance, apiMexc } from '../../../services';
import { compressImage } from "../../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { loginStart, loginSucess, loginFail } from '../../../redux/actions/userActions'
import { alertType } from '../../../redux/actions/alertActions'
import { CommonUtils, ToastUtil } from '../../../utils'
import { postDataAPI } from '../../../utils/fetchData'
import _ from 'lodash';
import moment from 'moment'
import "./MexcTrading.scss"
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
// const listSymbol = ["ZENUSDT", "SUIUSDT"]
const { Column, ColumnGroup } = Table;


const interval = '1d'; // Daily interval
const startTime = Date.now() - (14 * 24 * 60 * 60 * 1000); // Start time (14 days ago)
const endTime = Date.now(); // End time (current time)

const MexcTrading = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [listSymbol, setListSymbol] = useState([])
    const [listDataSymbol, setListDataSymbol] = useState([])
    const [dataSymbol, setDataSymbol] = useState([])
    const [calValue, setCalValue] = useState({})
    const [dataGroupSymbol, setDataGroupSymbol] = useState({})
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(async () => {
        await fetchExchangeInfo();
    }, []);

    useEffect(async () => {
        // await fetchInfoSymbol();
    }, [listSymbol]);

    const fetchExchangeInfo = async () => {
        dispatch(alertType(true))
        await apiMexc.getMexcExchangeInfo()
            .then(data => {
                if (data && data) {
                    // data = data.slice(0, 3)
                    data = _.filter(data, (item, index) => {
                        return item && item.symbol && item.symbol.includes("USDT")
                    })

                    let dataSymbol = _.map(data, (item, index) => {
                        return item.symbol
                    })
                    setListSymbol(dataSymbol)
                    setListDataSymbol(data)
                    dispatch(alertType(false))
                    ToastUtil.success("Tải danh sách mã chứng khoán thành công");
                }
            })
            .catch(error => {
                dispatch(loginFail())
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Tải danh sách mã chứng khoán không thành công");
            });
    }



    const fetchInfoSymbol = async () => {
        let body = { interval, startTime, endTime }
        let _listSymbol = _.cloneDeep(listSymbol)
        let _listDataSymbol = _.cloneDeep(listDataSymbol)
        if (_listDataSymbol.length > 0) {
            if (page === 1) {
                _listSymbol = _listSymbol.slice(0, 500);
            } else if (page === 2) {
                _listSymbol = _listSymbol.slice(500, 1000);
            } else if (page === 3) {
                _listSymbol = _listSymbol.slice(1000, 1500);
            } else if (page === 4) {
                _listSymbol = _listSymbol.slice(1500, 2000);
            } else if (page === 5) {
                _listSymbol = _listSymbol.slice(2000, _listDataSymbol.length);
            }
            setLoading(true);
        }
        // _listSymbol = _listSymbol.slice(0, 3);
        _.forEach(_listSymbol, async (symbol, indexSymbol) => {
            body.symbol = symbol
            await apiMexc.getMexcInfoSymbol(body)
                .then(async data => {
                    if (data && data.length > 0) {
                        let data7DaysPre = data.slice(0, 7);
                        let data7DaysNext = data.slice(7, 14);

                        let data3DaysPre = data.slice(8, 11);
                        let data3DaysNext = data.slice(11, 14);

                        const totalVolume7DaysPre = data7DaysPre.reduce((sum, item) => sum + Number(item[5]), 0);
                        const averageVolume7DaysPre = totalVolume7DaysPre / 7;
                        const totalVolume7DaysNext = data7DaysNext.reduce((sum, item) => sum + Number(item[5]), 0);
                        const averageVolume7DaysNext = totalVolume7DaysNext / 7;
                        const percentAverageVolume7Days = (Number(averageVolume7DaysNext) - Number(averageVolume7DaysPre)) * 100 / Number(averageVolume7DaysPre)

                        const totalVolume3DaysPre = data3DaysPre.reduce((sum, item) => sum + Number(item[5]), 0);
                        const averageVolume3DaysPre = totalVolume3DaysPre / 3;
                        const totalVolume3DaysNext = data3DaysNext.reduce((sum, item) => sum + Number(item[5]), 0);
                        const averageVolume3DaysNext = totalVolume3DaysNext / 3;
                        const percentAverageVolume3Days = (Number(averageVolume3DaysNext) - Number(averageVolume3DaysPre)) * 100 / Number(averageVolume3DaysPre)


                        _listDataSymbol = _.map(_listDataSymbol, (item, index) => {
                            if (item.symbol == symbol) {
                                return {
                                    ...item,
                                    averageVolume7DaysPre,
                                    averageVolume7DaysNext,
                                    percentAverageVolume7Days: percentAverageVolume7Days,
                                    averageVolume3DaysPre,
                                    averageVolume3DaysNext,
                                    percentAverageVolume3Days: percentAverageVolume3Days,
                                }
                            }
                            return item
                        })
                        if ((indexSymbol + 1) === _listSymbol.length) {
                            setLoading(false);
                            setListDataSymbol(_listDataSymbol)
                            ToastUtil.success("Tải thông tin mã chứng khoán thành công");
                            return
                        }
                        // ToastUtil.success("Đăng nhập thành công");
                        // await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                })
                .catch(error => {
                    setLoading(false);
                    ToastUtil.errorApi(error, "Tải thông tin mã chứng khoán không thành công");
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

    useEffect(() => {
        fetchInfoSymbol()
    }, [page]);

    console.log("Mexc_render", page, listDataSymbol)
    return (
        <div div className='mexc-trading' >
            <div className="mexc-trading-container">
                <div className="mexc-trading-content">
                    <div className="container-action style-add">
                        <button className="btn btn-add" onClick={() => fetchInfoSymbol()}>Call Data </button>
                    </div>
                    <div className="table-all-broker">
                        <Table
                            loading={loading}
                            // columns={columns}
                            dataSource={listDataSymbol}
                            virtual
                            scroll={{ x: 1000, y: 500 }}
                            pagination={{
                                pageSize: 500,
                                total: listDataSymbol.length,
                                onChange: (page) => {
                                    setPage(page)
                                },
                            }}
                            // scroll={{ x: 1000 }}
                            sticky={true}
                        >
                            <Column
                                title="STT" dataIndex="index" key="index" width={50} align='center'
                                render={(text, record, index) => index + 1}
                            />
                            <Column title="Mã" dataIndex="symbol" key="symbol" width={100} align='center' />
                            <Column
                                title="KLTB 3 ngày trước"
                                dataIndex="averageVolume3DaysPre"
                                key="averageVolume3DaysPre"
                                width={250} align='center'
                                sorter={(a, b) => a.averageVolume3DaysPre - b.averageVolume3DaysPre}
                                render={(text) => <span>{CommonUtils.formatNumber(text)}</span>}

                            />
                            <Column
                                title="KLTB 3 ngày tiếp theo"
                                dataIndex="averageVolume3DaysNext"
                                key="averageVolume3DaysNext"
                                width={250} align='center'
                                sorter={(a, b) => a.averageVolume3DaysNext - b.averageVolume3DaysNext}
                                render={(text) => <span>{CommonUtils.formatNumber(text)}</span>}
                            />
                            <Column
                                title="% KLTB 3 ngày"
                                dataIndex="percentAverageVolume3Days"
                                key="percentAverageVolume3Days"
                                width={250} align='center'
                                sorter={(a, b) => a.percentAverageVolume3Days - b.percentAverageVolume3Days}
                                render={
                                    (text) => <span className={"" + CommonUtils.getClassCheckValue(text)}>{CommonUtils.formatNumber(text)}%</span>
                                }
                            />


                            <Column
                                title="KLTB 7 ngày trước"
                                dataIndex="averageVolume7DaysPre"
                                key="averageVolume7DaysPre"
                                width={250} align='center'
                                sorter={(a, b) => a.averageVolume7DaysPre - b.averageVolume7DaysPre}
                                render={(text) => <span>{CommonUtils.formatNumber(text)}</span>}

                            />
                            <Column
                                title="KLTB 7 ngày tiếp theo"
                                dataIndex="averageVolume7DaysNext"
                                key="averageVolume7DaysNext"
                                width={250} align='center'
                                sorter={(a, b) => a.averageVolume7DaysNext - b.averageVolume7DaysNext}
                                render={(text) => <span>{CommonUtils.formatNumber(text)}</span>}
                            />
                            <Column
                                title="% KLTB 7 ngày"
                                dataIndex="percentAverageVolume7Days"
                                key="percentAverageVolume7Days"
                                width={250} align='center'
                                sorter={(a, b) => a.percentAverageVolume7Days - b.percentAverageVolume7Days}
                                render={
                                    (text) => <span className={"" + CommonUtils.getClassCheckValue(text)}>{CommonUtils.formatNumber(text)}%</span>
                                }
                            />
                        </Table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MexcTrading