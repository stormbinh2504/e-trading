import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import { TYPE_USER } from '../../utils';
import logo from "../../assets/svgs/logo.svg"

import "./Header.scss"


const listMenuHeaderCustomer = [
    {
        title: "Tìm thuê",
        path: "/thue-nha-dat"
    },
    {
        title: "Môi giới",
        path: "/tim-moi-gioi"
    },
    {
        title: "Blogs",
        path: "/blogs"
    },
    {
        title: "Giới thiệu",
        path: "/recommend"
    },
    {
        title: "Liên hệ",
        path: "/contact"
    },
]


const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [pathCur, setPathCur] = useState(history.location.pathname);

    const onRedirectPosting = () => {
        dispatch(actions.setTypeUser(TYPE_USER.BROKER, () => {
            history.push("/home-broker")
        }))
    }

    const onRedirectHome = () => {
        dispatch(actions.setTypeUser(TYPE_USER.CUSTOMER, () => {
            history.push("/home")
        }))

    }


    useEffect(() => {
        setPathCur(history.location.pathname)
    }, [history.location.pathname]);


    return (
        <div className='header'>
            <div className="container container-header">
                <div className="navbar-logo item-center">
                    <div onClick={onRedirectHome}>
                        <img className="img-logo" src={logo} />
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="menu-list">
                        {listMenuHeaderCustomer && listMenuHeaderCustomer.map((item, index) => {
                            return (
                                <div className={("menu-item item-center " + (pathCur === item.path ? "active" : ""))
                                } onClick={() => {
                                    setPathCur(item.path)
                                }}>
                                    <Link to={item.path}>
                                        {item.title}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="navbar-user item-center">
                    <div className="user-avatar">
                        <div className="avatar">
                            <i class="fa fa-user-circle"></i>
                        </div>
                    </div>
                    <div className="user-posting">
                        <div className="btn-posting item-center" onClick={onRedirectPosting}>
                            Đăng tin
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header