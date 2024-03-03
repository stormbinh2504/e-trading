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
import { connect } from 'react-redux';
import moment from 'moment'
import "./MexcTrading.scss"
import { Space, Table, Tag, Divider, Radio } from 'antd';
import axios from 'axios';
import { firebaseMethods } from '../../../firebase/firebaseMethods';
// const listSymbol = ["ZENUSDT", "SUIUSDT"]
const { Column, ColumnGroup, } = Table;


// var a = 2; // Giá trị ngày hôm nay
// var b = 1; // Giá trị ngày hôm trước

// // Tính phần trăm thay đổi
// var percentChange1 = ((a - b) / a) * 100; // Tăng thêm
// var percentChange2 = ((a - b) / b) * 100; // Tăng bao nhiêu % chứng khoán dùng thằng này

// // In kết quả
// console.log("Phần trăm thay đổi: " + percentChange1 + "%"); = 50%
// console.log("Phần trăm thay đổi: " + percentChange2 + "%"); = 100%

const interval = '1d'; // Daily interval
const startTime = Date.now() - (6 * 24 * 60 * 60 * 1000); // Start time (6 days ago)
const endTime = Date.now(); // End time (current time)
// rowSelection object indicates the need for row selection

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
const MexcTrading = ({ userInfo }) => {
    const history = useHistory()
    const { email } = userInfo
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [listSymbol, setListSymbol] = useState([])
    const [listDataSymbol, setListDataSymbol] = useState([])
    const [dataSymbol, setDataSymbol] = useState([])
    const [calValue, setCalValue] = useState({})
    const [dataGroupSymbol, setDataGroupSymbol] = useState({})
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedRowSymbols, setSelectedRowSymbols] = useState([]);
    const [symbolsWatched, setSymboslWatched] = useState([]);

    useEffect(async () => {
        await fetchExchangeInfo();
        await getSymbols();
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
        // _listSymbol = ["HEXUSDT"]
        // _listSymbol = _listSymbol.slice(0, 3);
        _.forEach(_listSymbol, async (symbol, indexSymbol) => {
            body.symbol = symbol
            await apiMexc.getMexcInfoSymbol(body)
                .then(async data => {
                    if (data) {
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
                            setPage(page + 1)
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
        if (page != 1 && page < 6) {
            fetchInfoSymbol()
        }
    }, [page]);

    // const selectRow = (record) => {
    //     const updatedSelectedRowKeys = [...selectedRowKeys];
    //     if (updatedSelectedRowKeys.includes(record.key)) {
    //         const index = updatedSelectedRowKeys.indexOf(record.key);
    //         updatedSelectedRowKeys.splice(index, 1);
    //     } else {
    //         updatedSelectedRowKeys.push(record.key);
    //     }
    //     setSelectedRowSymbols(updatedSelectedRowKeys);
    // };

    const onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowSymbols(selectedRowKeys);
    }

    const addSymbols = async () => {
        let data = {
            "symbols": selectedRowSymbols,
        }
        await firebaseMethods.setDataToFirebase(email, "listSymbols", data)
            .then(res => {
                ToastUtil.success("Lưu danh sách mã đã chọn thành công");
            })
            .catch(error => {
                ToastUtil.errorApi(error, "Lưu danh sách mã đã chọn không thành công");
            });
    }

    const clearAllSymbols = async () => {
        let data = {
            "symbols": [],
        }
        await firebaseMethods.setDataToFirebase(email, "listSymbols", data)
            .then(res => {
                setSymboslWatched([]);
                setSelectedRowSymbols([])
            })
            .catch(error => {
                ToastUtil.errorApi(error, "Lưu danh sách mã đã chọn không thành công");
            });
    }

    const getSymbols = async () => {
        await firebaseMethods.getDatafromFirebase(email, "listSymbols")
            .then(res => {
                if (res && res.symbols && res.symbols.length > 0) {
                    setSymboslWatched(res.symbols);
                    setSelectedRowSymbols(res.symbols);
                }
                ToastUtil.success("Tải danh sách mã đã chọn thành công");
            })
            .catch(error => {
                ToastUtil.errorApi(error, "Tải danh sách mã đã chọn không thành công");
            });
    }

    console.log("Mexc_render", selectedRowSymbols)
    return (
        <div div className='mexc-trading' >
            <div className="mexc-trading-container">
                <div className="mexc-trading-content">
                    <div className="container-action style-add">
                        <button className="btn btn-add" onClick={
                            () => {
                                setPage(1)
                                fetchInfoSymbol()
                            }
                        }>Call Data </button>
                        <button className="btn btn-add" onClick={addSymbols}>Luu symbol </button>
                        <button className="btn btn-add" onClick={getSymbols}>Lay symbol </button>
                        <button className="btn btn-add" onClick={clearAllSymbols}>Clear All symbol </button>
                    </div>
                    <div className="table-all-broker">
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                selectedRowKeys: selectedRowSymbols,
                                onChange: onSelectedRowKeysChange
                            }}
                            // onRow={(record) => ({
                            //     onClick: () => {
                            //         selectRow(record);
                            //     }
                            // })}
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

const mapStateToProps = state => ({
    userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(MexcTrading);