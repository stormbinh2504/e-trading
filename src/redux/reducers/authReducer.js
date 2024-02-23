import actionTypes from '../actions/actionTypes'

const initialState = {
    userInfor: {},
    isLogin: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return {
                ...state,
                userInfor: action.payload,
            };
        case actionTypes.LOGIN_AUTHENTICATION:
            return {
                ...state,
                isLogin: action.payload,
            };
        default:
            return state;
    }
}


export default authReducer