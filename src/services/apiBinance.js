import axiosBinance from '../axiosBinance';
import * as queryString from 'query-string';

let BINANCE_FAPI = "https://fapi.binance.com"
let BINANCE_API = "https://api.binance.com"

const apiBinance = {

    //Gọi dữ liệu theo thời gian
    getInfoSymbol(body) {
        // fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`)
        let { symbol, interval, startTime, endTime } = body
        let queryParams = {
            symbol, interval, startTime, endTime
        };

        return axiosBinance.get(`${BINANCE_FAPI}/fapi/v1/klines?` + queryString.stringify(queryParams))
    },

    //Gọi all danh sách mã chứng khoán
    getExchangeInfo(body) {
        // return axiosBinance.get(`${BINANCE_API}/api/v3/exchangeInfo`)
        return axiosBinance.get(`${BINANCE_FAPI}/fapi/v1/exchangeInfo`)
    },
}

export default apiBinance