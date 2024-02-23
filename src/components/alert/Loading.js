import React from 'react'
import "./Loading.scss"

import { ReactComponent as SPIN } from '../../assets/spin-api.svg';

const Loading = () => {
    return (
        <div className="lds-gear">
            <SPIN />
        </div>
    )
}

export default Loading
