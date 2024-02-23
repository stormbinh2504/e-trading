import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions'
import "./DropDownSettingUserBroker.scss"
import { CommonUtils } from '../../../utils';

const DropDownSettingUserBroker = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { setIsShowSetting } = props
    // const notiRef = useRef();

    // useOnClickOutside(notiRef, () => {
    //     console.log("useOnClickOutside")
    //     setIsShowSetting(false)
    // });

    const onHandleLogout = () => {
        dispatch(actions.logout())
        setTimeout(() => {
            history.push("/login")
        }, 50)
    }

    const onHandelRedirect = (link) => {
        history.push(link)
    }

    return (
        <div className="setting-container" >
            <ul class="profile-menu">
                <li onClick={() => onHandelRedirect("/alert-search")}><a href="/alert-search"><i class="fa fa-bell"></i>Thông báo &amp; Tìm kiếm</a></li>
                <li onClick={() => onHandelRedirect("/favorite")}><a href="/favorite"><i class="fa fa-heart"></i>Bất động sản yêu thích</a></li>
                <li onClick={() => onHandelRedirect("/profile")}><a href="/profile"><i class="fa fa-user"></i>Thông tin cá nhân</a></li>

                <li onClick={() => onHandelRedirect("/recharge-broker")} ><a href="/recharge-broker"><i class="fa fa-vcard-o"></i>Nạp tiền</a></li>

                <li onClick={() => onHandelRedirect("/Coupon/CouponList")}><a  ><i class="fa fa-gift"></i>Mã thưởng</a></li>
                <li onClick={() => onHandelRedirect("/change-password")}><a ><i class="fa fa-lock"></i>Thay đổi mật khẩu</a></li>
                <li class="divider"></li>
                <li onClick={onHandleLogout}><a><i class="fa fa-sign-out"></i>Thoát</a></li>
            </ul>
        </div>
    )
}

export default DropDownSettingUserBroker