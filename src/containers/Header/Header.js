import React, { useState, useEffect } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { PATH_NAME, setPathName } from '../../utils';
import "./Header.scss"
import logo from "../../assets/images/company/logo.png"

const Header = () => {
    const history = useHistory()

    const [isOpenModal, setOpenModal] = useState(false)
    const onRedirectHome = () => {
        window.location.href = '#'
    }

    const onScrollStickyHeader = () => {
        let header = document.getElementById("header");
        let containerHome = document.getElementById("container-home");
        let sticky = containerHome.offsetTop;
        // console.log("binh_check_scroll", window.pageYOffset, sticky)
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky-header")
        } else {
            header.classList.remove("sticky-header");
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScrollStickyHeader);

        return () => {
            window.removeEventListener("scroll", onScrollStickyHeader);
        };
    }, []);

    const onRedirectByPathname = (path) => {
        history.push(path);
    }

    const checkActiveMenu = (key) => {
        let pathnameCurent = window.location.pathname
        if (pathnameCurent === key) {
            return true
        }
        return false
    }

    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const scrollTo = (id) => {
        const item = document.getElementById(id)
        const pos = item.offsetTop
        const headerDiv = document.querySelector(".container-header")
        const headerHeight = headerDiv ? headerDiv.offsetHeight : 0
        const offsetTop = pos - headerHeight
        const offset = offsetTop > 0 ? offsetTop : 0
        window.scrollTo(0, offset)
    }
    console.log("first", isOpenModal)
    return (
        <div id="header" className='header'>
            <div className="container">
                <div id="container-header" className="container-header item-center">
                    <div className="container-left">
                        <div className='container-logo item-center' onClick={onRedirectHome}>
                            <img className="img-logo" src={logo} />
                        </div>
                        <div className="container-menu-header">
                            <ul className="list-menu-header item-center">
                                <li className="item-menu-header">
                                    <a href={PATH_NAME.BINANCE}>
                                        BINANCE
                                    </a>
                                </li>
                                <li className="item-menu-header">
                                    <a href={PATH_NAME.MEXC}>
                                        MEXC
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="container-menu-header__mobile">
                            {/*<div className="container-menu-header__mobile-logo">*/}
                            {/*/!*    Logo*!/*/}
                            {/*    logo*/}
                            {/*</div>*/}
                            <div className="container-menu-header__mobile-logo-menu" onClick={() => setShowMenuMobile(!showMenuMobile)}>
                                <div style={{ fontSize: 24, color: "#fff" }}>
                                    {/*    icon 3 gach*/}
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                </div>
                            </div>

                            <div className="menu-content-mobile" style={showMenuMobile ? { transform: "translateX(0%)" } : { transform: "translateX(-100%)" }}>
                                <div>
                                    <div className="menu-content-mobile-top">
                                        <div className="landing-header__menu-item">
                                            <a href="#" onClick={() => setShowMenuMobile(!showMenuMobile)}>
                                                <img src={logo} alt="" width={48} />
                                            </a>
                                        </div>
                                        <div className="landing-header__menu-mobile-logo-menu"
                                            onClick={() => setShowMenuMobile(!showMenuMobile)}>
                                            {/*    icon close*/}
                                            <span style={{ fontSize: 24, color: "#1A1A1A" }}>
                                                <i className="fa fa-times" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="menu-content-mobile-body">
                                        <div className="menu-item-mb">
                                            <a href={PATH_NAME.BINANCE}>
                                                <div>BINANCE</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="menu-content-mobile-body">
                                        <div className="menu-item-mb">
                                            <a href={PATH_NAME.MEXC}>
                                                <div>MEXC</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header