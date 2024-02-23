import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import Header from '../Header/Header'
import "./Home.scss"
import ProjectTop from './ProjectTop/ProjectTop'
import ProjectLoan from './ProjectLoan/ProjectLoan'
import SearchNewsHome from './SearchNewsHome/SearchNewsHome'
import BlogsHighlight from './BlogsHighlight/BlogsHighlight';


const df_listfeatures = [
    {
        name: "Review khu vực",
        link: "",
        icon: <i class="fa fa-area-chart" aria-hidden="true"></i>
    },
    {
        name: "Phòng trọ gần trường",
        link: "",
        icon: <i class="fa fa-graduation-cap" aria-hidden="true"></i>
    },
    {
        name: "Phòng trọ công nhân",
        link: "",
        icon: <i class="fa fa-users" aria-hidden="true"></i>
    },
    {
        name: "Review khu vực",
        link: "",
        icon: <i class="fa fa-area-chart" aria-hidden="true"></i>
    },
    {
        name: "10 Bước mua nhà",
        link: "",
        icon: <i class="fa fa-step-forward" aria-hidden="true"></i>
    },
    {
        name: "Vay mua nhà",
        link: "",
        icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
    },
]

const Home = () => {

    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { listBanner } = app
    let imgBG1 = listBanner.find((item, index) => item.lever == 1)
    let imgBG2 = listBanner.find((item, index) => item.lever == 2)

    console.log("binh_imgBG", app, imgBG1, listBanner)
    let sytle1 = {}
    let sytle2 = {}
    let url2 = {}
    if (imgBG1) {
        sytle1 = {
            backgroundImage: "url(" + imgBG1.imageUrl + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
    }
    // if(imgBG2){
    //     url2 = 
    // }
    // if (imgBG2) {
    //     sytle2 = {
    //         backgroundImage: "url(" + imgBG.imageUrl + ")",
    //         backgroundPosition: 'center',
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat'
    //     }
    // }
    return (
        <div className='container-home'>
            <div className="container-slider" style={sytle1}>
                <SearchNewsHome />
            </div>
            <div className="container-top-properties">
                <div className="container top-properties-info">
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <BlogsHighlight />
                    </div>
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <h2 class="title">Dự án nổi bật</h2>
                        <div class="property-items clearfix">
                            <ProjectTop />
                        </div>
                    </div>
                    <div id="banner-home-center" class="banner-home-center home-banner block-info">
                        <div class="banner-content">
                            <a href={imgBG2 ? imgBG2.url : ""} target="_blank" rel="follow" gtm-cat="banner" gtm-event="link" gtm-act="view-banner-home-top">
                                <img src={imgBG2 ? imgBG2.imageUrl : ""} />
                            </a>
                        </div>
                    </div>
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <h2 class="title">Bất động sản cho thuê</h2>
                        <div class="property-items clearfix">
                            <ProjectLoan />
                        </div>
                    </div>
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <iframe
                            id="ytplayer"
                            className={""}
                            type="text/html"
                            width="100%"
                            height="400"
                            src={'https://www.youtube.com/embed/PYv9_fOXMDA'}
                            frameBorder="0"
                        ></iframe>
                    </div>

                    <div id="features" class="features block-info" ng-non-bindable="">
                        <h2 class="title">Tiện ích từ Mogi.vn</h2>
                        <div class="list-features clearfix">
                            <div className="row">{
                                df_listfeatures.map((item, index) => {
                                    return (
                                        <div className="col-6 col-md-2">
                                            <div class="item-feature">
                                                {item.icon}
                                                <a class="link-overlay" href={item.link} >{item.name}</a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home