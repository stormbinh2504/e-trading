import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../../utils/imageUpload'
import { sdkVNPTService, authService, apiBinance } from '../../../services';
import { compressImage } from "../../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { loginStart, loginSucess, loginFail } from '../../../redux/actions/userActions'
import { alertType } from '../../../redux/actions/alertActions'
import { CommonUtils, ToastUtil } from '../../../utils'
import { postDataAPI } from '../../../utils/fetchData'
import _ from 'lodash';
import moment from 'moment'
import "./BinanceTrading.scss"
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
// const listSymbol = ["ZENUSDT", "SUIUSDT"]
const { Column, ColumnGroup } = Table;


const interval = '1d'; // Daily interval
const startTime = Date.now() - (6 * 24 * 60 * 60 * 1000); // Start time (6 days ago)
const endTime = Date.now(); // End time (current time)

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 50,
        align: 'center',
        render: (text, record, index) => (index + 1)
    },
    {
        title: 'Mã',
        dataIndex: 'symbol',
        key: 'symbol',
        width: 150,
        align: 'center',
        onCell: (record) => {
            return {
                onClick: () => {
                    const convertedSymbol = record.symbol.replace("USDT", "");
                    CommonUtils.onCopyText(convertedSymbol)
                }
            };
        }
    },

    {
        title: '% KLTB 3 ngày',
        dataIndex: 'percentAverageVolume3Days',
        key: 'percentAverageVolume3Days',
        width: 100,
        align: 'center',
        className: 'bg-day-3',
        sorter: (a, b) => a.percentAverageVolume3Days - b.percentAverageVolume3Days,
        render: (text) => <span className={"" + CommonUtils.getClassCheckValue(text)}>{CommonUtils.formatNumber(text)}%</span>,
        onFilter: (value, record) => record.percentAverageVolume3Days > value,
        filters: [
            {
                text: '>100%',
                value: 100,
            },
            {
                text: '>500%',
                value: 500,
            },
        ],
    },
    {
        title: '% KL thay đổi 2 phiên gần nhất',
        dataIndex: 'percentChangeVolumnLastDay',
        key: 'percentChangeVolumnLastDay',
        width: 160,
        align: 'center',
        className: 'bg-day-3',
        sorter: (a, b) => a.percentChangeVolumnLastDay - b.percentChangeVolumnLastDay,
        render: (text) => <span className={"" + CommonUtils.getClassCheckValue(text)}>{CommonUtils.formatNumber(text, 0)}%</span>,
        onFilter: (value, record) => record.percentChangeVolumnLastDay > value,
        filters: [
            {
                text: '>50%',
                value: 50,
            },
            {
                text: '>100%',
                value: 100,
            },
        ],
    },
    {
        title: '% Giá thay đổi 2 phiên gần nhất',
        dataIndex: 'precentChangePriceLastDay',
        key: 'precentChangePriceLastDay',
        width: 160,
        align: 'center',
        className: 'bg-day-3',
        sorter: (a, b) => a.precentChangePriceLastDay - b.precentChangePriceLastDay,
        render: (text) => <span className={"" + CommonUtils.getClassCheckValue(text)}>{CommonUtils.formatNumber(text, 0)}%</span>,
        onFilter: (value, record) => record.precentChangePriceLastDay < value,
        filters: [
            {
                text: '<30%',
                value: 30,
            },
        ],
    },
    {
        title: 'Tiền 24h 1 ngày trước',
        dataIndex: 'money24hLastDay',
        key: 'money24hLastDay',
        width: 100,
        align: 'center',
        className: 'bg-day-3',
        sorter: (a, b) => a.money24hLastDay - b.money24hLastDay,
        render: (text) => <span className={""} style={{ fontWeight: "500" }}>{CommonUtils.formatNumber(text)}</span>,
        onFilter: (value, record) => record.money24hLastDay > value,
        filters: [
            {
                text: '>300,000',
                value: 300000,
            },
            {
                text: '>1,000,000',
                value: 1000000,
            },
            {
                text: '>3,000,000',
                value: 3000000,
            },
        ],
    },
]

const BinanceTrading = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [listSymbol, setListSymbol] = useState([])
    const [listDataSymbol, setListDataSymbol] = useState([])
    const [dataSymbol, setDataSymbol] = useState([])
    const [calValue, setCalValue] = useState({})
    const [dataGroupSymbol, setDataGroupSymbol] = useState({})
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        await fetchExchangeInfo();
    }, []);

    useEffect(async () => {
        // await fetchInfoSymbol();
    }, [listSymbol]);

    const fetchExchangeInfo = async () => {
        dispatch(alertType(true))
        await apiBinance.getExchangeInfo()
            .then(res => {
                if (res && res.symbols) {
                    let data = res.symbols
                    data = _.map(data, (item, index) => {
                        return {
                            ...item,
                            key: item.symbol,
                            // averageVolume3DaysPre: 0,
                            // averageVolume3DaysNext: 0,
                            percentAverageVolume3Days: 0,
                            money24hLastDay: 0,
                            percentChangeVolumnLastDay: 0,
                            precentChangePriceLastDay: 0,
                        }
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
        setLoading(true);
        let _listSymbol = _.cloneDeep(listSymbol)
        let _listDataSymbol = _.cloneDeep(listDataSymbol)
        // _listSymbol = _listSymbol.slice(0, 3);
        _.forEach(_listSymbol, async (symbol, indexSymbol) => {
            body.symbol = symbol
            await apiBinance.getInfoSymbol(body)
                .then(async data => {
                    if (data && data.length > 0) {
                        let money24hLastDay = 0
                        let percentChangeVolumnLastDay = 0 // % thay đổi khối lượng ngày hôm trước với hôm nay
                        let precentChangePriceLastDay = 0 // % thay đổi giá ngày hôm trước với hôm nay
                        let dataLength = data.length
                        if (dataLength > 3) {
                            let itemToday = data[dataLength - 1]  //dữ liệu ngày hôm nay
                            let itemLastDay = data[dataLength - 2] //dữ liệu ngày 1 ngày trước
                            let item2DayBefore = data[dataLength - 3] //dữ liệu 2 ngày trước
                            let averageHighLowLastDay = ((Number(itemLastDay[2]) + Number(itemLastDay[3])) / 2) || 0
                            money24hLastDay = (averageHighLowLastDay * Number(itemLastDay[5])) || 0


                            percentChangeVolumnLastDay = (Number(itemLastDay[5]) - Number(item2DayBefore[5])) * 100 / Number(item2DayBefore[5])
                            precentChangePriceLastDay = (Number(itemLastDay[4]) - Number(item2DayBefore[4])) / Number(item2DayBefore[4]) * 100
                        }

                        let data3DaysPre = data.slice(0, 3);
                        let data3DaysNext = data.slice(3, 6);

                        const totalVolume3DaysPre = data3DaysPre.reduce((sum, item) => sum + Number(item[5]), 0);
                        const averageVolume3DaysPre = totalVolume3DaysPre / 3;
                        const totalVolume3DaysNext = data3DaysNext.reduce((sum, item) => sum + Number(item[5]), 0);
                        const averageVolume3DaysNext = totalVolume3DaysNext / 3;
                        let percentAverageVolume3Days = 0
                        if (averageVolume3DaysPre && averageVolume3DaysPre != 0) percentAverageVolume3Days = (Number(averageVolume3DaysNext) - Number(averageVolume3DaysPre)) * 100 / Number(averageVolume3DaysPre)


                        _listDataSymbol = _.map(_listDataSymbol, (item, index) => {
                            if (item.symbol == symbol) {
                                return {
                                    ...item,
                                    // averageVolume3DaysPre: averageVolume3DaysPre || 0,
                                    // averageVolume3DaysNext: averageVolume3DaysNext || 0,
                                    percentAverageVolume3Days: percentAverageVolume3Days || 0,
                                    money24hLastDay: money24hLastDay || 0,
                                    percentChangeVolumnLastDay: percentChangeVolumnLastDay || 0,
                                    precentChangePriceLastDay: precentChangePriceLastDay || 0,
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

    console.log("Binance_render", listDataSymbol)
    return (
        <div div className='binance-trading' >
            <div className="binance-trading-container">
                <div className="binance-trading-content">
                    <div className="container-action style-add">
                        <button className="btn btn-add" onClick={fetchInfoSymbol}>Call Data </button>
                    </div>
                    <div className="table-all-broker">
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={listDataSymbol}
                            // virtual
                            scroll={{ x: 1000, y: 500 }}
                            pagination={false}
                            // scroll={{ x: 1000 }}
                            sticky={true}
                        >

                        </Table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BinanceTrading