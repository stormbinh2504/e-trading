import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions'
import { TYPE_USER } from '../../../utils';

import "./PageContainerBroker.scss"
const PageContainerBroker = ({ children, titleId }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div className='container-broker'>
            <div className="container-content-broker">
                <div className='page-header-broker'>
                    <div className="container">
                        <h1 class="page-title">{titleId}</h1>
                    </div>
                </div>
                <div className='page-body-broker'>
                    <div className="container">
                        {children}
                    </div>
                </div>
                <div className="page-footer-broker">
                    <div className="container">
                        <p>© 2023 - mogi.vn</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageContainerBroker