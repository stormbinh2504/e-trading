import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalFirstLogin.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../components/DraggableModal/DraggableModal';
import { alertType, initializeApp } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, RegexUtils } from '../../utils';
import { accountService, globalService } from '../../services';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const ModalFirstLogin = (props) => {
    const { isOpen, onClose } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [phone, setPhone] = useState(null);

    const onHandleUpdate = async () => {

        if (_.isEmpty(phone)) {
            ToastUtil.error("Chưa nhập số điện thoại");
            return
        }
        let isValid = RegexUtils.regexPhone.test(phone.toString())
        if (!isValid) {
            ToastUtil.error("Số điện thoại phải bắt đầu bằng 0, bao gồm kí tự kiểu số(0-9). Độ dài (10-20) kí tự.");
            return
        }

        let body = {
            "codeClient": userInfo.codeClient,
            "phone": phone,
            "codeClient": userInfo.codeClient,
            "provinceCode": userInfo.provinceCode,
            "districtCode": userInfo.districtCode,
            "wardsCode": userInfo.wardsCode,
            "introduces": userInfo.introduces,
            "typeLoan": userInfo.typeLoan,
            "passport": userInfo.passport,
            "url": userInfo.url,
            "firstName": userInfo.firstName,
            "lastName": userInfo.lastName,
        }

        dispatch(alertType(true))
        await accountService.updateInfoClient(body)
            .then(res => {
                dispatch(alertType(false))
                onClose()
                dispatch(initializeApp())
                ToastUtil.success("Cập nhật thành công");
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Cập nhật không thành công");
            });
    }



    const handleChangeInput = e => {
        const { name, value } = e.target
        setPhone(value)
    }

    console.log("binh_ModalFirstLogin", phone)

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-first-login"}
            titleId={"Thêm số điện thoại"}
            toggle={onClose}
            hideClose={true}
        >
            <div className="body">
                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Số điện thoại
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={phone} name="phone"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="container-action style-add">
                        <button class="btn btn-continue" onClick={onHandleUpdate} >
                            Cập nhật
                        </button>
                    </div>
                </div>

            </div>
        </DraggableModal>
    )
}

export default ModalFirstLogin