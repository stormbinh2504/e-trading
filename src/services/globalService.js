import axios from '../axios';
import * as queryString from 'query-string';
let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API

// let BASE_URL_API = process.env.REACT_APP_PAYPAL_CLIENT_ID

const globalService = {
    getProvinceAll() {
        return axios.get(`${REACT_APP_BASE_URL_API}province/findAll`)
    },

    getFindAllDistrictsByProvinceCode(provinceCode) {
        var queryParams = {
            provinceCode
        };
        return axios.get(`${REACT_APP_BASE_URL_API}districts/findAllByProvinceCode?` + queryString.stringify(queryParams))
    },

    getFindAllWardsByDistrictCode(districtsCode) {
        var queryParams = {
            districtsCode
        };
        return axios.get(`${REACT_APP_BASE_URL_API}wards/findAllByDistrictCode?` + queryString.stringify(queryParams))
    },

    getAllTypeLoan() {
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllTypeLoan`)
    },

    getAllTypePropertyCategory() { // Loại bất động sản
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllTypePropertyCategory`)
    },

    getAllCodeTypeProperty(codeTypePropertyCategory) {  // Lấy chi tiết theo loại bất động sản
        var queryParams = {
            codeTypePropertyCategory
        };
        return axios.get(`${REACT_APP_BASE_URL_API}typepropery/findAllByCodeTypeProperty?` + queryString.stringify(queryParams))
        // return axios.get(`${REACT_APP_BASE_URL_API}typepropery/findAllByCodeTypePropertyCategory?` + queryString.stringify(queryParams))
    },

    getAllLawCategory() { // Lấy ra loại pháp lý
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllLawCategory`)
    },

    getAllTypeAccount() { // Lấy ra loại tài khoản
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllTypeAccount`)
    },

    getAllStatusNews() { // Lấy ra danh sách trạng thái tin
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllStatusNews`)
    },


    getFindAllProvinceAndDistrict() { //Danh sách tỉnh quận huyện
        return axios.get(`${REACT_APP_BASE_URL_API}province/findAllProvinceAndDistrict`)
    },

    getFindAllTypePropertyAndCategoryTypeProperty() { //Danh sách loại bất động sản
        return axios.get(`${REACT_APP_BASE_URL_API}typepropery/findAllTypePropertyAndCategoryTypeProperty`)
    },

    getFindAllNewsCustomer(body) { //Danh sách tin Customer
        return axios.post(`${REACT_APP_BASE_URL_API}news/customer/findAllNews`, body)
    },

    getFindAllNewsCustomerFavourite(body) { //Danh sách tin Customer
        return axios.post(`${REACT_APP_BASE_URL_API}news/favouriteNews`, body)
    },

    getFindNewsDetailCustomer(id) { //Danh sách tin Customer
        var queryParams = {
            id
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/customer/findNewsDetail?` + queryString.stringify(queryParams))
    },

    getFindNewsSameCustomer(data) { //Danh sách tin liên quan Customer
        const { codeTypeProperty,
            codeCateTypePropertyCategory,
            provinceCode,
            idCurrent } = data
        var queryParams = {
            codeTypeProperty,
            codeCateTypePropertyCategory,
            provinceCode,
            idCurrent,
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/customer/findNewsSame?` + queryString.stringify(queryParams))

        //http://localhost:8080/news/customer/findNewsSame?codeTypeProperty=typeproperty_7&codeCateTypePropertyCategory=3&provinceCode=&idCurrent=1
    },


    setPlusViewForNews(id) { //Mỗi lần click vào 1 trang detail của tin thì sẽ cộng 1 view 
        var queryParams = {
            id
        };
        return axios.get(`${REACT_APP_BASE_URL_API}news/customer/plusViewForNews?` + queryString.stringify(queryParams))
    },

    getOutstandingProject(id) { //Lấy ra danh sách những tin nổi bật (Tin có view cao)
        return axios.get(`${REACT_APP_BASE_URL_API}news/customer/outstandingProject`)
    },


    getFindNewByCodeCate(id) { //Lấy ra danh sách tin theo code_category. Ví dụ Nhà(10), Căn hộ(0) , Đất (1)
        return axios.get(`${REACT_APP_BASE_URL_API}news/customer/findNewByCodeCate`)
    },


}

export default globalService