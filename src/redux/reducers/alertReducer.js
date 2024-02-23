import actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALERT:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}


export default alertReducer
