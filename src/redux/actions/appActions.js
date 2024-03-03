import { GLOBALTYPES } from './actionTypes'
import { postDataAPI } from '../../utils/fetchData'
import { Link, useHistory } from 'react-router-dom'
// import { browserHistory } from 'react-router'
import { push } from "connected-react-router";
import { batch } from 'react-redux';
import { CommonUtils, TYPE_USER, ToastUtil } from '../../utils';
import { setUserInfo, loginFail } from './userActions';
import { accountService } from '../../services';

export const setTypeUser = (type, callback) => {
    return (dispatch, getState) => {
        const state = getState();
        return
        if (type === TYPE_USER.BROKER) {
            if (CommonUtils.checkLogined()) {
                dispatch({
                    type: "SET_TYPE_USER",
                    data: type
                })
                callback && callback()
            }
        } else {
            dispatch({
                type: "SET_TYPE_USER",
                data: type
            })
            callback && callback()
        }
    };
};

export const initializeApp = (custodycd) => {
    return (dispatch, getState) => {
        const state = getState();
        const haveSavedSession = state.user.token != null;
        dispatch(loadDataBanner())
        // Lưu lại thông tin token nếu localStorage rỗng
        let usersTokens = JSON.parse(localStorage.getItem('token-users'));
        if (haveSavedSession && !usersTokens) {
            // dispatch(authorizationSuccess(state.user.token));
        }


        if (!haveSavedSession) {
            return
        }
        batch(() => {
            if (haveSavedSession) {
                dispatch(fetchUserInfoFromSavedSession());
            }
        })

    }
};


export const fetchUserInfoFromSavedSession = () => {
    return (dispatch, getState) => {
        accountService.getRequiredData()
            .then((responses) => {
                const [userInfo] = responses;
                batch(() => {
                    console.log("binh_check_setUserInfo", userInfo, responses)
                    dispatch(setUserInfo(userInfo))
                })
            })
            .catch((error) => {
                // dispatch(loginFail(error));
            });
    };
}



export const updateDataFilterNews = (objData) => {
    return (dispatch, getState) => {
        const state = getState();
        console.log("updateDataFilterNews", objData)
        dispatch({
            type: "UPDATE_DATA_FILTER_NEWS",
            data: objData
        })
    };
};


export const updateDataFilterAgency = (objData) => {
    return (dispatch, getState) => {
        const state = getState();
        console.log("updateDataFilterNews", objData)
        dispatch({
            type: "UPDATE_DATA_FILTER_AGENCY",
            data: objData
        })
    };
};


export const updateDataFilterBlogs = (objData) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: "UPDATE_DATA_BLOG",
            data: objData
        })
    };
};


export const loadDataBanner = () => {
    return (dispatch, getState) => {
        const state = getState();
        accountService.getBanner()
            .then((res) => {
                if (res && res.length > 0) {
                    dispatch({
                        type: "LOAD_DATA_BANNER",
                        data: res
                    })
                }
            })
            .catch((error) => {
                ToastUtil.errorApi(error)
            });
    };
};