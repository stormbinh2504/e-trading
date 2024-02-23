import React from 'react'
import "./Footer.scss"
import logo from "../../assets/svgs/logo.svg"
import bocongthuong from "../../assets/images/bocongthuong.png"

const list_menu = [
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
    {
        title: "Bất động sản TPHCM",
        menuItem: [
            {
                label: "Mua bán nhà đất TPHCM",
                url: "/ho-chi-minh/mua-nha-dat"
            },
            {
                label: "Bán nhà quận 7",
                url: "/ho-chi-minh/quan-7/mua-nha"
            },
            {
                label: "Căn hộ quận 7",
                url: "/ho-chi-minh/quan-7/mua-can-ho"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-9/mua-dat"
            },
            {
                label: "Bán đất quận 10",
                url: "/ho-chi-minh/quan-10/thue-phong-tro-nha-tro"
            },
            {
                label: "Bán đất quận 9",
                url: "/ho-chi-minh/quan-8/thue-nha"
            },
        ]
    },
]
const Footer = () => {
    return (
        <div class="footer" ng-non-bindable="">
            <div class="container">
                <div className="row">

                    <div class="col-3 footer-left">
                        <ul class="footer-01">
                            <li><img src={logo} alt="Mogi.vn" height="32" width="96" /></li>
                            <li><i class="fa fa-phone"></i>0522 982 504</li>
                            <li><i class="fa fa-envelope"></i><a href="mailto:nnbinh2504@gmail.com">nnbinh2504@gmail.com</a></li>
                            <li class="social-icon">
                                <span>
                                    <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                </span>
                                <span>
                                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                </span>
                                <span>
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </span>
                            </li>
                        </ul>
                        <ul class="footer-02">
                            <li><h3 class="footer-title">CÔNG TY CỔ PHẦN ĐỊNH ANH</h3></li>
                            <li>
                                <p>
                                    - Trụ sở chính: 28-30 đường số 2, Hưng Gia 5, P.Tân Phong, Quận 7, TP. Hồ Chí Minh
                                </p>
                                <p>
                                    - Chịu trách nhiệm chính: Ông Phạm Chu Hi
                                </p>
                                <p>
                                    - Giấy phép số: 429/GP-BTTTT do Bộ TTTT cấp ngày 11/10/2019
                                </p>
                            </li>
                            <li>
                                <a href="http://online.gov.vn/homepage/websitedisplay.aspx?docid=31190" target="_blank" rel="nofollow" aria-label="bocongthuong">
                                    <img class="lozad bocongthuong" width="150" height="47" alt="bo cong thuong" src={bocongthuong} data-loaded="true" />

                                </a>
                            </li>
                            <li>Mogi.vn có trách nhiệm chuyển tải thông tin. Chúng tôi không chịu bất kỳ trách nhiệm nào từ các tin này.</li>
                        </ul>
                    </div>
                    <div class="col-9 footer-right">
                        <div className="row">
                            {list_menu.map((item, index) => {
                                return (
                                    <div className="col-3 footer-right-parent">
                                        <div className="footer-title">
                                            {item.title}
                                        </div>
                                        <ul>
                                            {item.menuItem.map((item2, index2) => {
                                                return (
                                                    <li>
                                                        <a href={item2.url}>{item2.label}</a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}

export default Footer