import actionTypes from './actionTypes'
import { postDataAPI } from '../../utils/fetchData'
import { Link, useHistory } from 'react-router-dom'
// import { browserHistory } from 'react-router'
import { push } from "connected-react-router";
import * as actions from '../../redux/actions'
import { TYPE_USER } from '../../utils';

export const loginStart = () => ({
    type: actionTypes.USER_LOGIN_START
});

export const loginSucess = (res) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            data: res
        })
        // dispatch(actions.fetchUserInfoFromSavedSession());
    };
};

export const loginFail = (error) => ({
    type: actionTypes.USER_LOGIN_FAIL,
    error: error
});


export const setUserInfo = (data) => {
    return (dispatch, getState) => {
        const state = getState();
        console.log("binh_check_setUserInfo", data)
        dispatch({
            type: actionTypes.SET_USER_INFO,
            data: data
        })
    };
};


export const loginAuthentication = (isLogin) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOGIN_AUTHENTICATION,
        payload: isLogin
    })
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: actionTypes.ALERT, payload: { loading: true } })

        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: actionTypes.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

            dispatch({ type: actionTypes.ALERT, payload: {} })

        } catch (err) {
            dispatch({
                type: actionTypes.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const register = (data) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.ALERT, payload: { loading: true } })
        const res = await postDataAPI('register', data)
        // dispatch({
        //     type: actionTypes.AUTH,
        //     payload: {
        //         token: res.data.access_token,
        //         user: res.data.user
        //     }
        // })

        dispatch({
            type: actionTypes.ALERT,
            payload: {
                success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: actionTypes.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}


export const logout = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: actionTypes.USER_LOGOUT,
        })
    };
};