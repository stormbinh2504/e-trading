import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import Slider from "react-slick";
import "./ProjectLoan.scss"

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const ProjectLoan = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { filterNews } = app

    const { userInfo } = user
    const { location } = history
    const { pathname } = location

    const [listNewsSame, setListNewsSame] = useState(null)

    useEffect(() => {
        fetchGetOutstandingProject()
    }, []);


    const fetchGetOutstandingProject = async () => {

        let body = {
            "nameSearch": null,
            "provinceCode": null,
            "districtCode": null,
            "codeTypeProperty": null, // important
            "codeCateTypePropertyCategory": null,
            "priceStart": null,
            "priceEnd": null,
            "areaMinRange": null,
            "areaMaxRange": null,
            "totalRoom": null,
            "rangeDaySearch": 365,
            "page": 0,
            "size": 5
        }

        dispatch(alertType(true))
        await globalService.getFindAllNewsCustomer(body)
            .then(res => {
                if (res) {
                    if (res.content && res.content.length > 0) {
                        setListNewsSame(res.content)
                    } else {
                        setListNewsSame([])
                    }
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const onRedirectDetail = (record) => {
        console.log("binh_onRedirectDetail", record)
        const { id } = record
        if (id) {
            let pathname = `thue-nha-dat/${id}`
            window.location.pathname = pathname
        }
    }

    console.log("binh_ProjectLoan", { listNewsSame, history })
    return (
        <div class="project-top" >
            <Slider {...settings}>
                {listNewsSame && listNewsSame.length > 0 && listNewsSame.map((item, index) => {
                    return (
                        < div className="item-news" onClick={() => onRedirectDetail(item)}>
                            <div className="block block-img">
                                <img src={item.url} />
                            </div>
                            <div className="block block-content">
                                <div className="item-info">
                                    <h3 className="info-name">
                                        {item.nameNews}
                                    </h3>
                                    <div className="info-addr">
                                        {item.address}
                                    </div>
                                    <div className="info-price">
                                        {CommonUtils.formatNumber(item.priceLoan, 0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div >
    )
}

export default ProjectLoan