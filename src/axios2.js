import axios from 'axios';
import _ from 'lodash';

const config = {
    api: {
        HOME_PAGE: "/fs2pro/",
        // API_BASE_URL: "https://192.168.1.145/",
        API_BASE_URL: "https://192.168.1.168/",
        BOND_API_BASE_URL: "https://192.168.1.242/bond/",
        // API_MARKET_URL: "https://192.168.1.157",
        API_MARKET_URL: "https://192.168.1.168",
        API_CHART_DATA_URL: "https://apis.bvsc.com.vn/tvcharts-1.0",
        //api lấy tin tức, đồ thị bên thứ 3
        API_NEWS_SERVICE: "https://apis.bvsc.com.vn/tvcharts-1.0",
        // api lấy Thông tin các tin tức theo mã CK
        API_MARKET_NOTIFICATION_BY_SYMBOL: "https://apis.bvsc.com.vn/frontend-news-1.0/symbolRelatedNews?",
        // api lấy Thông tin cho Thông tin thị trường
        API_MARKET_NOTIFICATION: "https://10.140.4.136:8080/frontend-news-1.0/topNewsAll?",
        // api lấy Thông tin các tin tức theo nhóm
        API_MARKET_NOTIFICATION_BY_GROUP: "https://10.140.4.136:8080/frontend-news-1.0/topNewsByCat?",
        // api lấy chi tiết thông tin bằng id thông tin
        API_MARKET_NOTIFICATION_DETAIL: "https://apis.bvsc.com.vn/frontend-news-1.0/newsDetails?",
        // CLIENT_ID: "FUXH9U0R7Q",
        // CLIENT_SECRET: "bd31Ctu6czkemvFfnSLAUV0zsYGUYL",
        CLIENT_ID: "FZKD31RTMO",
        CLIENT_SECRET: "AiscAPP9jgSZ9bMjxlkDQypW3I8tEP",
        REDIRECT_URL: "http://localhost:3000/sso",
        SIGN_PLUGIN_CHROME_URL: 'https://127.0.0.1:11368/',
        SIGN_PLUGIN_NOT_CHROME_URL: 'https://127.0.0.1:11369/',
        STATE_AGE: 60 * 5,
        TIME_OUT: 100 * 1000
    },
    app: {
        /**
         * The base URL for all locations. If your app is served from a sub-directory on your server, you'll want to set
         * this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.
         */
        ROUTER_BASE_NAME: null,
        SERVER_DATE_FORMAT: "DD/MM/YYYY",
        PRICE_BOARD_URL: '/priceboard/checkLoginSSO',
        IS_CHECK_TRADE_QTTY: true,
        TIME_SKIP_EVENT_ACCOUNT: 1000,
        // IS_LOGIN_POPUP: true, // PRO/test:true || local:local
        IS_LOGIN_POPUP: 'local', // PRO/test:true || local:local
    },

    constant: {
        //custodycd cua cty CK
        OWN_CUSTODYCD: "001P000000",
        //accountid cua ty ck
        OWN_ACCOUNTID: "0001900001",
        //huy.quang: paging page size
        ROW_PER_PAGE: 10,
        //huy.quang: interval in seconds
        RESEND_OTP_INTERVAL: 5,
    },

    switch: {
        enableRefreshToken: false,
        //huy.quang: config cac widget k move + resize dc
        isWidgetStatic: true,
        //huy.quang: config co cho doi config duyet lenh dat ko
        enableReconfirmOrderSwitch: false
    },

    conditionOrderList: [
        { id: "GTC", nameId: "trade.advance-condition-order.gtc-full-name", isShow: true },
        { id: "STO", nameId: "trade.advance-condition-order.sto-full-name", isShow: false },
        { id: "SEO", nameId: "trade.advance-condition-order.seo-full-name", isShow: false },
        { id: "SO", nameId: "trade.advance-condition-order.so-full-name", isShow: false },
        { id: "OCO", nameId: "trade.advance-condition-order.oco-full-name", isShow: false },
        { id: "MCO", nameId: "trade.advance-condition-order.mco-full-name", isShow: false },
        { id: "OTO", nameId: "trade.advance-condition-order.oto-full-name", isShow: false },
        { id: "ICO", nameId: "trade.advance-condition-order.ico-full-name", isShow: false },
        { id: "PCO", nameId: "trade.advance-condition-order.pco-full-name", isShow: false },
        { id: "CPO", nameId: "trade.advance-condition-order.cpo-full-name", isShow: false },
        { id: "TSO", nameId: "trade.advance-condition-order.tso-full-name", isShow: false }
    ],

    // Cấu hình index hiển thị (department: index thuộc sở HOSE/HNX)
    ALL_INDEXES: [
        { title: 'VN-INDEX', code: 'HOSE', department: 'HOSE' },
        { title: 'VN30-INDEX', code: '30', department: 'HOSE' },
        { title: 'HNX-INDEX', code: 'HNX', department: 'HNX' },
        { title: 'HNX30-INDEX', code: 'HNX30', department: 'HNX' },
        { title: 'UPCOM', code: 'UPCOM', department: 'HNX' },
        { title: 'VNMID-INDEX', code: 'MID', department: 'HOSE' },
        { title: 'VN100-INDEX', code: '100', department: 'HOSE' },
        { title: 'VNSML-INDEX', code: 'SML', department: 'HOSE' },
        { title: 'VNXALL-INDEX', code: 'XALL', department: 'HOSE' },
        { title: 'VNX50-INDEX', code: 'X50', department: 'HOSE' },
        { title: 'VNSI-INDEX', code: 'SI', department: 'HOSE' },
        { title: 'VNX200-INDEX', code: 'X200', department: 'HOSE' }
    ],

    // Link file hướng dẫn
    // ALL_LINK: {
    //     vi: {
    //         TONG_HOP_TAI_SAN: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/2. Màn hình tổng hợp tài sản của tiểu khoản.pdf',
    //         GUI_TIEN_IDEPOSIT: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/1.1 Gửi tiền iDeposit.pdf',
    //         RUT_TIEN_IDEPOSIT: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/1.2 Rút tiền iDeposit.pdf',
    //         THAY_DOI_MON_IDEPOSIT: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/1.3 Thay đổi món iDeposit.pdf',
    //         MUA_TRAI_PHIEU: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/3.1 Mua trái phiếu.pdf',
    //         BAN_TRAI_PHIEU: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/3.2 Bán lại và gia hạn trái phiếu.pdf',
    //         UNG_TRUOC: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.1 Ứng trước.pdf',
    //         DANG_KY_QUYEN_MUA: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.2 Đăng ký quyền mua.pdf',
    //         XAC_NHAN_LENH: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.3 Xác nhận lệnh.pdf',
    //         DANG_KY_CHUYEN_DOI_TRAI_PHIEU: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.4 Đăng ký chuyển đổi trái phiếu.pdf'
    //     },
    //     en: {
    //         TONG_HOP_TAI_SAN: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/2. Account balance.pdf',
    //         GUI_TIEN_IDEPOSIT: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/1.1 iDeposit depositing.pdf',
    //         RUT_TIEN_IDEPOSIT: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/1.2 iDeposit withdrawing.pdf',
    //         THAY_DOI_MON_IDEPOSIT: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/1.3 iDeposit changing.pdf',
    //         MUA_TRAI_PHIEU: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/3.1 Bond Purchasing.pdf',
    //         BAN_TRAI_PHIEU: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/3.2 Bond Managing and Repurchasing.pdf',
    //         UNG_TRUOC: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.1 Cash Advance.pdf',
    //         DANG_KY_QUYEN_MUA: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.2 Purchase Right Register.pdf',
    //         XAC_NHAN_LENH: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.3 Order Confirmation.pdf',
    //         DANG_KY_CHUYEN_DOI_TRAI_PHIEU: 'https://bvsc.com.vn/Sites/QuoteVN/SiteRoot/Bwise/4.4 Convertible bonds Register.pdf'
    //     },
    // },
    ALL_LINK: {
        vi: {
            TONG_HOP_TAI_SAN: '',
            GUI_TIEN_IDEPOSIT: '',
            RUT_TIEN_IDEPOSIT: '',
            THAY_DOI_MON_IDEPOSIT: '',
            MUA_TRAI_PHIEU: '',
            BAN_TRAI_PHIEU: '',
            UNG_TRUOC: '',
            DANG_KY_QUYEN_MUA: '',
            XAC_NHAN_LENH: '',
            DANG_KY_CHUYEN_DOI_TRAI_PHIEU: '',
        },
        en: {
            TONG_HOP_TAI_SAN: '',
            GUI_TIEN_IDEPOSIT: '',
            RUT_TIEN_IDEPOSIT: '',
            THAY_DOI_MON_IDEPOSIT: '',
            MUA_TRAI_PHIEU: '',
            BAN_TRAI_PHIEU: '',
            UNG_TRUOC: '',
            DANG_KY_QUYEN_MUA: '',
            XAC_NHAN_LENH: '',
            DANG_KY_CHUYEN_DOI_TRAI_PHIEU: '',
        },
    },
    autoScrollTimePerRow: 1000 // millisecond - Thời gian scroll qua một dòng (Cảng nhỏ scroll càng nhanh)
};

const instance = axios.create({
    baseURL: "https://192.168.1.168/",
    withCredentials: true,
});
const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};

export const isSuccessStatusCode = (s) => {
    // May be string or number
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

const isTokenExpiredError = (response) => {
    if (response.status !== 401) {
        return false;
    }

    if (config.switch.enableRefreshToken) {
        const data = response.data;
        if (data == null) {
            return false;
        }

        if (('string' === typeof data) && data === 'Unauthorized') {
            return true;
        }

        if (data.hasOwnProperty('d') && data['d'] === 'Access-Token is unauthorized') {
            return true;
        }
        return false;
    } else return true;
};

instance.interceptors.request.use((request) => {
    let basic = `${config.api.CLIENT_ID}:${config.api.CLIENT_SECRET}`
    if (request.baseURL === config.api.API_BASE_URL) {
        request.headers.common['x-via'] = 'O';
        request.headers.authorization = `Basic ${btoa(basic)}`
        request.headers.common['x-lang'] = "lang";
        if (request.method === 'post' && typeof request.data === 'string') {
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
    }
    return request;
});

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;

        // Case check exist account return error code
        if (data.hasOwnProperty('ec') && data.ec === -200019) {
            return Promise.reject(createError(response.status, data['s'], data['em'], null, data.ec));
        }

        if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('ec')) {
            return Promise.reject(createError(response.status, data['s'], data['em'], null, data['ec'] ? data['ec'] : ""));
        }

        // Return direct data to callback
        if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
            return data['d'];
        }
        // Handle special case
        if (data.hasOwnProperty('s') && _.keys(data).length === 1) {
            return null;
        }
        return response.data;
    },
    (error) => {
        const { response } = error;
        if (response == null) {
            return Promise.reject(error);
        }

        if (isTokenExpiredError(response)) {
            alert('401')
        }

        const { data } = response;

        if (data.hasOwnProperty('s') && data.hasOwnProperty('em')) {
            return Promise.reject(createError(response.status, data['s'], data['em']));
        }

        if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
            return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        }
        alert('here111111111111')

        return Promise.reject(createError(response.status));
    }
);
export default instance;