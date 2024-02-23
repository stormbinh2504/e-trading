import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./HomeBroker.scss"
import PageContainerBroker from './../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { accountService, } from '../../services';
import { ToastUtil, CommonUtils } from '../../utils';
import { alertType } from '../../redux/actions';

const HomeBroker = () => {
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { codeClient } = userInfo
    const history = useHistory()
    const dispatch = useDispatch()

    const [dataHome, setDataHome] = useState({})


    const onGoToRecharge = () => {
        history.push("/recharge-broker")
    }


    const onGoToManagementNews = () => {
        history.push("/news-management")
    }

    const onGoToManagementProperty = () => {
        history.push("/property-management")
    }


    useEffect(() => {
        fetchGetHomeClient();
    }, []);

    const fetchGetHomeClient = async (page) => {
        dispatch(alertType(true))

        await accountService.getHomeClient(codeClient)
            .then(res => {
                if (res) {
                    setDataHome(res);
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                // ToastUtil.errorApi(error, "Không thể tải vè thông tin");
            });
    }


    return (
        <PageContainerBroker
            titleId={"Thông tin cá nhân"}
        >
            <div className="home-broker">
                <div className="home-broker-content row gutters-5">
                    <div className="col-4 side-bar">
                        <div className="widget user-profile ">
                            <div className="avatar item-center">
                                <img src={userInfo.url ? userInfo.url : Avatar} />
                            </div>
                            <div className="user-name item-center ">
                                {dataHome.fullName}
                            </div>
                            <div className="user-phone item-center">
                                {userInfo.phone}
                            </div>
                            <div className="user-phone item-center">
                                {dataHome && dataHome.email}
                            </div>
                            <div className="user-level item-center" style={{ display: "flex", gap: "5px" }} onClick={() => { history.push("/register-type-account") }}>
                                <i className="fa fa-edit"></i>
                                <span className="savings">{userInfo.accountLeverTypeName}</span>
                            </div>
                        </div>
                        <div className="widget info-support">
                            <div className="title">Nhân viên hỗ trợ</div>
                            <ul className="support-staff">
                                <li>
                                    <i className="fa fa-user"></i>Nguyễn Trần Thanh Ngân
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i><a href="tel:0899381845" target="_top"><span>0899381845</span></a>
                                </li>
                                <li>
                                    <i className="zaloicon"></i>0899381845
                                </li>
                            </ul>
                        </div>
                        <div className="widget mbpay">
                            <ul className="mbpay-balance">
                                <li className="">
                                    <i className="fa fa-dollar"></i>Tài khoản chính
                                    <span className="value ng-binding text-right" >{CommonUtils.formatNumber(userInfo.money, 0)}</span>
                                </li>
                                <li className="">
                                    <i className="fa fa-gift"></i>Khuyến mãi
                                    <span className="value ng-binding text-right" >0</span>
                                </li>
                            </ul>
                            <div className="container-btn-mbpay text-right">
                                <button className="btn-mbpay" onClick={onGoToRecharge}>
                                    Nạp tiền
                                </button>
                            </div>
                        </div>
                        <div className="banner-account">
                            <div className="banner-content">
                            </div>
                        </div>
                    </div>
                    <div className="col-8 main-section">
                        <div className="dashboard-section">
                            <div className="title">Tin đăng của tôi</div>
                            <div className="summary">
                                <div className="summary-item">
                                    <span>Đang đăng:</span>
                                    <span className="counter ng-binding">{dataHome && dataHome.expiredNews}</span>
                                    {/* <button className="btn-detail">Chi tiết</button> */}
                                </div>
                                <div className="summary-item">
                                    <span>Tin lỗi:</span>
                                    <span className="counter ng-binding" >0</span>
                                    {/* <button className="btn-detail">Chi tiết</button> */}
                                </div>
                                <div className="summary-item">
                                    <span>Tin khác:</span>
                                    <span className="counter ng-binding" >0</span>
                                    {/* <button className="btn-detail">Chi tiết</button> */}
                                </div>
                                <div className="summary-item">
                                    <span>Tổng số tin:</span>
                                    <span className="counter ng-binding">{dataHome && dataHome.allNews ? dataHome.allNews : "0/0"}</span>
                                    <button className="btn-detail" onClick={onGoToManagementNews}>Chi tiết</button>
                                </div>
                                <div className="summary-item">
                                    <span>Tổng số tài sản:</span>
                                    <span className="counter ng-binding">{dataHome && dataHome.postingProperty ? dataHome.postingProperty : 0}</span>
                                    <button className="btn-detail" onClick={onGoToManagementProperty}>Chi tiết</button>
                                </div>
                            </div>
                        </div>
                        <div class="trial-warning">
                            <p><b>Lưu ý:</b> Tài khoản dùng thử chỉ được đăng tối đa <b>1 tin</b>.</p>
                        </div>
                        {/* <div class="dashboard-section">
                            <div class="title">Khu vực môi giới</div>
                            <div class="summary dashboard-table subscription">
                                <div class="dashboard-row clearfix ng-scope">
                                    <div className="summary-item">
                                        <span>Hà Nội</span>
                                        <span className="counter ng-binding">Hết hạn <span ng-bind="item.ExpiredDate | date: 'dd/MM/yyyy'" class="ng-binding">18/12/2022</span></span>
                                        <button className="btn-detail">Gia hạn</button>
                                    </div>
                                </div>
                            </div>
                            <div class="buy-more-subscription">
                                <a ng-href="/phi-thanh-vien" href="/phi-thanh-vien"><i class="fa fa-plus-circle"></i> Thêm khu vực môi giới</a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </PageContainerBroker>
    )
}

export default HomeBroker