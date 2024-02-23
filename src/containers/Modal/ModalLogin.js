import React from 'react'
import { Modal } from 'reactstrap';
import "./ModalLogin.scss"

const ModalLogin = ({ isOpenModalLogin, onCloseModalLogin }) => {
    const gotoDashBoard = () => {
        window.location.pathname = "/dashboard"
    }

    return (
        <Modal isOpen={isOpenModalLogin} className='modal-login' centered={true}>
            <div className="btn-close" onClick={onCloseModalLogin}>
                X
            </div>
            <button type="button" class="btn btn-success" onClick={gotoDashBoard}>Go to DashBoard</button>
        </Modal >
    )
}

export default ModalLogin
