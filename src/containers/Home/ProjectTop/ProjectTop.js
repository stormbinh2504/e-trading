import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import Slider from "react-slick";
import "./ProjectTop.scss"

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

const ProjectTop = () => {
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
        dispatch(alertType(true))
        await globalService.getOutstandingProject()
            .then(res => {
                if (res && res.length > 0) {
                    setListNewsSame(res)
                }
                dispatch(alertType(false))
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

    console.log("binh_ProjectTop", { listNewsSame, history })
    let src = "https://firebasestorage.googleapis.com/v0/b/mogiproject-33024.appspot.com/o/Category%2Fclient.3%2F063eba4d0ae64159b83eb874cd090e24.jpgf957dd55-62b0-44f7-944d-e99593c9d141?alt=media&token=132f548e-8f77-4822-8b8e-be4d33ab55a1"
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
                                        {CommonUtils.formatNumber(item.money, 0)}
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

export default ProjectTop