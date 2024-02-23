import actionTypes from '../actions/actionTypes'

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    isLogginFail: false,
    token: "",
    refreshToken: "",
    userInfo: {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_START:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: true,
                isLogginFail: false,
                token: "",
                refreshToken: "",
                userInfo: {},
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            const { userInfo, token, refreshToken } = action.data
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                isLogginFail: false,
                refreshToken,
                token,
                userInfo: {
                    ...userInfo,
                }
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                isLoggedIn: false,
                isLoggingIn: false,
                isLogginFail: true,
                token: "",
                refreshToken: "",
                userInfo: {},
            };
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...action.data,
                }
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}


export default userReducer