import axios from 'axios';
import { reduxStore, dispatch } from './redux/store';
import * as actions from './redux/actions';
import * as queryString from "query-string";
import { Random } from './utils';

const globalVar = window._env_
let instance = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '', errorData) => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    error.data = errorData
    return error;
};

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;

        if (data.hasOwnProperty('status') && data['status'] == 500) {
            return Promise.reject(createError(data['status'], data['status'], data['message']));
        }
        // console.log('axiosBinance_interceptors', data);
        return data;
    },
    async (error) => {
        const { response } = error;
        if (response == null) {
            return Promise.reject(error);
        }
        return Promise.reject(createError(response.status));
    }
);

export default instance;