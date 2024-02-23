import actionTypes from './actionTypes'
import { postDataAPI } from '../../utils/fetchData'
import { Link, useHistory } from 'react-router-dom'


export const alertType = (type) => async (dispatch) => {
    dispatch({
        type: actionTypes.ALERT,
        payload: type
    })
}