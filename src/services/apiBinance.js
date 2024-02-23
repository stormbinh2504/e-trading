import axiosBinance from '../axiosBinance';
import * as queryString from 'query-string';

let BINANCE_API = "https://fapi.binance.com"

const apiBinance = {

    //Gọi dữ liệu theo thời gian
    getInfoSymbol(body) {
        // fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`)
        let { symbol, interval, startTime, endTime } = body
        let queryParams = {
            symbol, interval, startTime, endTime
        };

        return axiosBinance.get(`${BINANCE_API}/fapi/v1/klines?` + queryString.stringify(queryParams))
    },
}

export default apiBinance