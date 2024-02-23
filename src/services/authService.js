import axios from '../axios';

let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API

// let BASE_URL_API = process.env.REACT_APP_PAYPAL_CLIENT_ID

const authService = {
    RegisterClient(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}auth/registerAccount`, body)
    },
    LoginClient(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}auth/login`, body)
    },

    changePassword(body) {
        return axios.post(`${REACT_APP_BASE_URL_API}auth/changePassword`, body)
    },

    // LoginClient(body) {
    //     return axios.post(`auth/login`, body)
    // }
}

export default authService