// import actionTypes from './actionTypes'
// import { postDataAPI } from '../../utils/fetchData'
// import { Link, useHistory } from 'react-router-dom'
// // import { browserHistory } from 'react-router'
// import { push } from "connected-react-router";

// // export const login = (res) => {
// //     async (dispatch) => {
// //         dispatch({
// //             type: GLOBALTYPES.AUTH,
// //             payload: {
// //                 token: res.data.access_token,
// //                 user: res.data.user
// //             }
// //         })
// //     }
// // }


// export const login = () => {
//     return (dispatch, getState) => {
//         const state = getState();
//         serverService.getContactInfo()
//             .then((data) => {
//                 dispatch({
//                     type: actionTypes.SET_CONTACT_INFO,
//                     data: data
//                 });
//             })
//             .catch((error) => {
//                 dispatch({
//                     type: actionTypes.SET_CONTACT_INFO_FALSE
//                 });
//             });


//     };
// };

// export const loginAuthentication = (isLogin) => async (dispatch) => {
//     dispatch({
//         type: GLOBALTYPES.LOGIN_AUTHENTICATION,
//         payload: isLogin
//     })
// }

// // export const refreshToken = () => async (dispatch) => {
// //     const firstLogin = localStorage.getItem("firstLogin")
// //     if (firstLogin) {
// //         dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

// //         try {
// //             const res = await postDataAPI('refresh_token')
// //             dispatch({
// //                 type: GLOBALTYPES.AUTH,
// //                 payload: {
// //                     token: res.data.access_token,
// //                     user: res.data.user
// //                 }
// //             })

// //             dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

// //         } catch (err) {
// //             dispatch({
// //                 type: GLOBALTYPES.ALERT,
// //                 payload: {
// //                     error: err.response.data.msg
// //                 }
// //             })
// //         }
// //     }
// // }

// export const register = (data) => async (dispatch) => {
//     try {
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
//         const res = await postDataAPI('register', data)
//         // dispatch({
//         //     type: GLOBALTYPES.AUTH,
//         //     payload: {
//         //         token: res.data.access_token,
//         //         user: res.data.user
//         //     }
//         // })

//         dispatch({
//             type: GLOBALTYPES.ALERT,
//             payload: {
//                 success: res.data.msg
//             }
//         })
//     } catch (err) {
//         dispatch({
//             type: GLOBALTYPES.ALERT,
//             payload: {
//                 error: err.response.data.msg
//             }
//         })
//     }
// }


// export const logout = () => async (dispatch) => {
//     try {
//         localStorage.removeItem('firstLogin')
//         await postDataAPI('logout')
//         window.location.href = "/login"
//     } catch (err) {
//         dispatch({
//             type: GLOBALTYPES.ALERT,
//             payload: {
//                 error: err.response.data.msg
//             }
//         })
//     }
// }