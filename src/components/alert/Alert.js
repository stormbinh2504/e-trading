import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/actionTypes'
import { toast, ToastContainer } from "react-toastify";

import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const dispatch = useDispatch()
    const { alert } = useSelector((state) => state);
    return (
        <div>
            {alert.loading && <Loading />}
        </div>
    )
}

export default Notify
