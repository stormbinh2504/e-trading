import axiosMexc from '../axiosMexc';
import * as queryString from 'query-string';

let MEXC_API = "https://api.mexc.com"
//https://mexcdevelop.github.io/apidocs/spot_v3_en/#compressed-aggregate-trades-list
const apiBinance = {

    //Gọi dữ liệu theo thời gian
    getMexcInfoSymbol(body) {
        let { symbol, interval, startTime, endTime } = body
        let queryParams = {
            symbol, interval, startTime, endTime
        };

        return axiosMexc.get(`${MEXC_API}/api/v3/klines?` + queryString.stringify(queryParams))
    },

    //Gọi all danh sách mã chứng khoán
    getMexcExchangeInfo(body) {
        return axiosMexc.get(`${MEXC_API}/api/v3/ticker/price`)
    },
}

export default apiBinance