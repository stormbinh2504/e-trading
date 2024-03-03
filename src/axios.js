import axios from 'axios';
import { reduxStore, dispatch } from './redux/store';
import * as actions from './redux/actions';
import * as queryString from "query-string";
import { Random } from './utils';

const globalVar = window._env_
let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API
// let URL = "http://localhost:8080/"
let URL = "http://127.0.0.1:8080/"
// let URL = "hhttp://103.219.180.85/"
let instance = axios.create({
    // url: "http://localhost:8080"
    // baseURL: URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    // timeout: 10000
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

export const isSuccessStatusCode = (s) => {
    // May be string or number
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

const isTokenExpiredError = (response) => {
    if (response.status !== 403) {
        return false;
    }
    return true;

    // if (config.switch.enableRefreshToken) {
    if (false) {
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

let isRefreshingAccessToken = false;

// This is the list of waiting requests that will retry after the token refresh complete
let subscribers = [];

const resetTokenAndReattemptRequest = (error) => {
    try {
        const { response: errorResponse } = error;
        const state = reduxStore.getState();
        const refreshToken = state.user.token != null ? state.user.token['refresh_token'] : null;
        if (!refreshToken) {
            // We can't refresh, throw the error anyway
            return Promise.reject(error);
        }

        /*
         * Proceed to the token refresh procedure. We create a new Promise that will retry the request, clone all the
         * request configuration from the failed request in the error object.
         */
        const retryOriginalRequest = new Promise((resolve, reject) => {
            /*
             * We need to add the request retry to the queue since there another request that already attempt to
             * refresh the token
             */
            addSubscriber(newToken => {
                if (newToken) {
                    errorResponse.config.headers.Authorization = 'Bearer ' + newToken;
                    resolve(instance(errorResponse.config));
                } else {
                    reject(error);
                }
            });
        });
        if (!isRefreshingAccessToken) {
            isRefreshingAccessToken = true;

            const body = queryString.stringify({
                'grant_type': 'refresh_token',
                // 'client_id': globalVar.api.CLIENT_ID,
                // 'client_secret': globalVar.api.CLIENT_SECRET,
                // 'refresh_token': refreshToken
            });

            // axios.post(buildRefreshTokenUrl(), body, { withCredentials: false })
            //     .then(response => {
            //         if (!response.data) {
            //             return Promise.reject(error);
            //         }
            //         const newToken = response.data['access_token'];

            //         // Save the newly refreshed token for other requests to use
            //         // dispatch(actions.setRefreshTokenSuccess(response.data));
            //         isRefreshingAccessToken = false;
            //         onRefreshTokenComplete(newToken);
            //     })
            //     .catch(() => {
            //         // dispatch(actions.setRefreshTokenFail());
            //         isRefreshingAccessToken = false;
            //         onRefreshTokenComplete(null);
            //     });
        }
        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
};

const onRefreshTokenComplete = (newToken) => {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(newToken));
    subscribers = [];
};

const addSubscriber = (callback) => {
    subscribers.push(callback);
};

const parseCookiesToObj = (cookieStr) => {
    let output = {}
    cookieStr.split(";").forEach(function (pair) {
        pair = pair.split("=");
        output[pair[0].trim()] = pair.splice(1).join('=');
    });
    return output;
}

instance.interceptors.request.use(request => {
    const state = reduxStore.getState();
    const { data } = request
    console.log('binh_check_request', request, state);
    // Edit request config
    // if (request.baseURL === globalVar.api.API_BASE_URL) {
    if (request && request.url) {
        const token = state.user.token != null ? state.user.token : null;
        // request.headers.common['x-devicetype'] = 'SessionID';
        // request.headers.common['x-lang'] = 'vi';

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        if (request.method === 'post' && typeof request.data === 'string') {
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        console.log('binh_check_request2', request);
        return request;
    }
}, (error) => {
    // console.log(error);
    return Promise.reject(error);
});

// instance.interceptors.request.use((request) => {
//     console.log('binh_ckeck_request', request, globalVar.api.API_BASE_URL);
//     const state = reduxStore.getState();
//     if (request.baseURL === globalVar.api.API_BASE_URL) {

//         // const token = state.user.token != null ? state.user.token['access_token'] : null;

//         //voi moi gioi thi truyen kenh la F
//         // if (state && state.user) {
//         //     request.headers.common['x-via'] = 'F';
//         // } else {
//         //     request.headers.common['x-via'] = 'O';
//         // };
//         // request.headers.common['track_log_id'] = trackLogId;
//         // let cookie = parseCookiesToObj(document.cookie);
//         // let currentBaseID = getValueFromLocalStorage(keyFactory.baseid);
//         // if (!currentBaseID) currentBaseID = genBaseId();
//         // request.headers.common['baseid'] = currentBaseID;
//         // request.headers.common['user'] = cookie.ssouserid;
//         // request.headers.common['x-device'] = cookie['fs2prosid'] ? cookie['fs2prosid'] : '';
//         // request.headers.common['x-devicetype'] = 'SessionID';
//         // request.headers.common['x-lang'] = state.app.language;
//         // request.headers.common['x-lang'] = state.app.language;

//         // if (token) {
//         //     request.headers.Authorization = `Bearer ${token}`;
//         // }

//         // if (request.method === 'post' && typeof request.data === 'string') {
//         //     request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//         // }
//     }
//     return request;
// },
//     (error) => {
//         // console.log(error);
//         return Promise.reject(error);
//     })


instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;

        if (data.hasOwnProperty('status') && data['status'] == 500) {
            return Promise.reject(createError(data['status'], data['status'], data['message']));
        }
        console.log('binh_check_request3', response, data);
        return data && data.data;
    },
    async (error) => {
        const { response } = error;
        if (response == null) {
            return Promise.reject(error);
        }

        const { data } = response;
        console.log("binh_response", response, isTokenExpiredError(response))
        if (isTokenExpiredError(response)) {
            // dispatch(actions.setRefreshTokenFail());
            // isRefreshingAccessToken = false;
            // onRefreshTokenComplete(null);
            await dispatch(actions.logout())
            // await dispatch(actions.setIsOpenExpiredTokenErrorScreen(true))
            // await dispatch(actions.logoutBySessionExpired())
        }


        // if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
        //     return Promise.reject(createError(response.status, data['s'], data['errmsg']));
        // }

        // if (data.hasOwnProperty('s') && data.hasOwnProperty('em')) {
        //     return Promise.reject(createError(response.status, data['s'], data['em']));
        // }

        // if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
        //     return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        // }

        return Promise.reject(createError(response.status));
    }
);

export default instance;