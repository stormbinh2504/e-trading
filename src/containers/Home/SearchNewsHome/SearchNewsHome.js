import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterNews } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, useOnClickOutside } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./SearchNewsHome.scss"
import _ from 'lodash';

const df_placeholder = "Nhập từ khóa tìm kiếm"

const df_PRICE = [
    {
        label: "Tất cả",
        value: null,
    },
    {
        label: "1 triệu",
        value: 1000000,
    },
    {
        label: "5 triệu",
        value: 5000000,
    },
    {
        label: "10 triệu",
        value: 10000000,
    },
    {
        label: "20 triệu",
        value: 20000000,
    },
    {
        label: "30 triệu",
        value: 30000000,
    },
    {
        label: "50 triệu",
        value: 50000000,
    },
    {
        label: "100 triệu",
        value: 100000000,
    },
]


let filterNews_df = {
    "nameSearch": null,
    "provinceCode": null,
    "districtCode": null,
    "codeTypeProperty": null,
    "codeCateTypePropertyCategory": null,
    "priceStart": null,
    "priceEnd": null,
    "areaMinRange": null,
    "areaMaxRange": null,
    "totalRoom": null,
    "rangeDaySearch": 365,
}

const SearchNewsHome = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataProvinceAndDistrictAll, setDataProvinceAndDistrictAll] = useState([])
    const [dataTypePropertyAndCategoryTypePropertyAll, setDataTypePropertyAndCategoryTypePropertyAll] = useState([])
    const [listOpen, setListOpen] = useState({
        isOpenLocation: false,
        isOpenProperty: false,
        isOpenPrice: false,
    })

    const [locationFilterName, setLocationFilterName] = useState("Toàn quốc")
    const [propertyFilterName, setPropertyFilterName] = useState("Loại bất động sản")
    const [priceFilterName, setPriceFilterName] = useState("Giá thuê")

    const [inputFormFilter, setInputFormFilter] = useState(filterNews_df)

    const [placeholder, setPlaceholder] = useState(df_placeholder.slice(0, 0));
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const locationRef = useRef();
    const propertyRef = useRef();
    const priceRef = useRef();

    useOnClickOutside(locationRef, () => {
        setListOpen({
            isOpenLocation: false,
        })
    });

    useOnClickOutside(propertyRef, () => {
        setListOpen({
            isOpenProperty: false,
        })
    });

    useOnClickOutside(priceRef, () => {
        setListOpen({
            isOpenPrice: false,
        })
    });

    useEffect(() => {
        fetchGetFindAllProvinceAndDistrict()
        fetchGetFindAllTypePropertyAndCategoryTypeProperty()
    }, []);

    const onHandleSetLocationFilterName = () => {
        if (dataProvinceAndDistrictAll && dataProvinceAndDistrictAll.length > 0) {
            dataProvinceAndDistrictAll.forEach((e, i) => {
                if (e.provinceCode === inputFormFilter.provinceCode) {
                    setLocationFilterName(e.provinceName)
                }
            })
        }
    }

    const onHandleSetPropertyFilterName = () => {
        if (dataTypePropertyAndCategoryTypePropertyAll && dataTypePropertyAndCategoryTypePropertyAll.length > 0) {
            dataTypePropertyAndCategoryTypePropertyAll.forEach((e, i) => {
                if (e.codeCateTypePropertyCategory == inputFormFilter.codeCateTypePropertyCategory) {
                    setPropertyFilterName(e.nameCodeCateTypePropertyCategory)
                }
            })
        }
    }


    const onHandleSetPriceFilterName = () => {
        const { priceStart, priceEnd } = inputFormFilter
        console.log("binh_onHandleSetPriceFilterName", inputFormFilter)
        if (priceStart == null && priceEnd == null) {
            setPriceFilterName("Giá thuê")
        }
        if (priceStart !== null && priceEnd == null) {
            let findPrice = df_PRICE.find((item, index) => item.value === priceStart)
            if (findPrice) {
                setPriceFilterName(`> ${findPrice.label}`)
            }
        }
        if (priceEnd !== null && priceStart == null) {
            let findPrice = df_PRICE.find((item, index) => item.value === priceEnd)
            if (findPrice) {
                setPriceFilterName(`< ${findPrice.label}`)
            }
        }
        if (priceStart !== null && priceEnd !== null) {
            let findPriceStart = df_PRICE.find((item, index) => item.value === priceStart)
            let findPriceEnd = df_PRICE.find((item, index) => item.value === priceEnd)
            if (findPriceStart && findPriceEnd) {
                setPriceFilterName(`${findPriceStart.label} - ${findPriceEnd.label}`)
            }
        }
    }


    useEffect(() => {
        const intr = setInterval(() => {
            setPlaceholder(df_placeholder.slice(0, placeholderIndex));
            if (placeholderIndex + 1 > df_placeholder.length) {
                setPlaceholderIndex(0)
            } else {
                setPlaceholderIndex(placeholderIndex + 1)
            }
        }, 100);
        return () => {
            clearInterval(intr)
        }
    },);

    useEffect(() => {
        onHandleSetLocationFilterName()
    }, [inputFormFilter.provinceCode]);


    useEffect(() => {
        onHandleSetPropertyFilterName()
    }, [inputFormFilter.codeCateTypePropertyCategory]);


    useEffect(() => {
        onHandleSetPriceFilterName()
    }, [inputFormFilter.priceStart, inputFormFilter.priceEnd]);

    const fetchGetFindAllProvinceAndDistrict = async () => {
        dispatch(alertType(true))
        await globalService.getFindAllProvinceAndDistrict()
            .then(res => {
                if (res && res.length > 0) {
                    let _res = res
                    // _res.unshift({ provinceCode: "ALL", provinceName: "Toàn quốc" })
                    setDataProvinceAndDistrictAll(_res)
                    onHandleSetLocationFilterName()
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }


    const fetchGetFindAllTypePropertyAndCategoryTypeProperty = async () => {
        dispatch(alertType(true))
        await globalService.getFindAllTypePropertyAndCategoryTypeProperty()
            .then(res => {
                if (res && res.length > 0) {
                    let _res = res
                    setDataTypePropertyAndCategoryTypePropertyAll(_res)
                    onHandleSetPropertyFilterName()
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setInputFormFilter((prev) => ({ ...prev, [name]: value }))
    }

    const onHandleUpdateDataFilterNews = (e, objData) => {
        e.stopPropagation()
        setInputFormFilter((prev) => ({ ...prev, ...objData }))
    }


    const searchFilter = () => {
        history.push("/thue-nha-dat")
        let objData = { ...inputFormFilter }
        dispatch(updateDataFilterNews(objData))
    }

    console.log("PageSearchFilterNews_render", { locationFilterName, propertyFilterName, dataTypePropertyAndCategoryTypePropertyAll, inputFormFilter: inputFormFilter })

    return (
        <div class="search-news-home" >
            <div className="wrap-search-news-home">
                <div className="title-search">
                    An tâm chọn, An tâm mua
                </div>
                <div className="search-content">
                    <div className="search-input">
                        <div className="search-filter-name">
                            <input className="" value={inputFormFilter.nameSearch}
                                onChange={handleChangeInput}
                                placeholder={placeholder}
                                name="nameSearch"
                            />


                        </div>
                        <div className="btn-search item-center" onClick={searchFilter}>
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="search-filter">

                        <div className="property-location-filter search-dropdown" onClick={() => {
                            setListOpen({
                                isOpenLocation: !listOpen.isOpenLocation,
                                isOpenProperty: false,
                                isOpenPrice: false,
                            })
                        }}>
                            <div className="btn btn-search-dropdown">
                                <span className="icon">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                </span>
                                <span className="nane">
                                    {locationFilterName}
                                </span>
                                <span className="icon">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </div>
                            {listOpen.isOpenLocation &&
                                <div className="wrap-dropdown-menusub-filter" ref={locationRef}>
                                    <ul className="dropdown-menusub-filter">
                                        {dataProvinceAndDistrictAll && dataProvinceAndDistrictAll.map((e, i) => {
                                            if (e.districsList && e.districsList.length > 0) {
                                                return (
                                                    <li className={"dropdown-menuitem-filter " + (e.provinceCode == inputFormFilter.provinceCode ? "active" : "")}
                                                        onClick={(event) => onHandleUpdateDataFilterNews(event, { "provinceCode": e.provinceCode, "districtCode": null })}
                                                    >
                                                        <div className="wrap-content">
                                                            <span>
                                                                {e.provinceName}
                                                            </span>
                                                            <span className='icon-select'>
                                                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <ul className="dropdown-menu-child">
                                                            {e.districsList.map((e2, i2) => {
                                                                return (
                                                                    <li className={(e2.districtCode == inputFormFilter.districtCode ? "active" : "")}
                                                                        onClick={(event) => onHandleUpdateDataFilterNews(event, { "provinceCode": e.provinceCode, "districtCode": e2.districtCode })}
                                                                    >
                                                                        <div className={"wrap-content"}>
                                                                            {e2.districtName}
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li className={"dropdown-menuitem-filter " + (e.provinceCode == inputFormFilter.provinceCode ? "active" : "")}
                                                        onClick={(event) => onHandleUpdateDataFilterNews(event, { "provinceCode": e.provinceCode, "districtCode": null })}
                                                    >
                                                        <div className="wrap-content">
                                                            <span>
                                                                {e.provinceName}
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>



                        <div className="property-location-filter search-dropdown" onClick={() => {
                            setListOpen({
                                isOpenProperty: !listOpen.isOpenProperty,
                                isOpenLocation: false,
                                isOpenPrice: false,
                            })
                        }}>
                            <div className="btn btn-search-dropdown">
                                <span className="icon">
                                    <i class="fa fa-home" aria-hidden="true"></i>
                                </span>
                                <span className="nane">
                                    {propertyFilterName}
                                </span>
                                <span className="icon">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </div>
                            {listOpen.isOpenProperty &&
                                <div className="wrap-dropdown-menusub-filter" ref={propertyRef}>
                                    <ul className="dropdown-menusub-filter">
                                        {dataTypePropertyAndCategoryTypePropertyAll && dataTypePropertyAndCategoryTypePropertyAll.map((e, i) => {
                                            if (e.propertyList && e.propertyList.length > 0) {
                                                return (
                                                    <li className={"dropdown-menuitem-filter " + (e.codeCateTypePropertyCategory == inputFormFilter.codeCateTypePropertyCategory ? "active" : "")}
                                                        onClick={(event) => onHandleUpdateDataFilterNews(event, { "codeCateTypePropertyCategory": e.codeCateTypePropertyCategory, "codeTypeProperty": null })}
                                                    >
                                                        <div className="wrap-content">
                                                            <span>
                                                                {e.nameCodeCateTypePropertyCategory}
                                                            </span>
                                                            <span className='icon-select'>
                                                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <ul className="dropdown-menu-child">
                                                            {e.propertyList.map((e2, i2) => {
                                                                return (
                                                                    <li className={(e2.codeTypeProperty == inputFormFilter.codeTypeProperty ? "active" : "")}
                                                                        onClick={(event) => onHandleUpdateDataFilterNews(event, { "codeCateTypePropertyCategory": e.codeCateTypePropertyCategory, "codeTypeProperty": e2.codeTypeProperty })}
                                                                    >
                                                                        <div className={"wrap-content"}>
                                                                            {e2.nameTypeProperty}
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li className={"dropdown-menuitem-filter " + (e.codeCateTypePropertyCategory == inputFormFilter.codeCateTypePropertyCategory ? "active" : "")}
                                                        onClick={(event) => onHandleUpdateDataFilterNews(event, { "codeCateTypePropertyCategory": e.codeCateTypePropertyCategory, "codeTypeProperty": null })}
                                                    >
                                                        <div className="wrap-content">
                                                            <span>
                                                                {e.nameCodeCateTypePropertyCategory}
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>


                        <div className="property-location-filter search-dropdown" onClick={() => {
                            setListOpen({
                                isOpenPrice: !listOpen.isOpenPrice,
                                isOpenProperty: false,
                                isOpenLocation: false,
                            })
                        }}>
                            <div className="btn btn-search-dropdown">
                                <span className="icon">
                                    <i class="fa fa-usd" aria-hidden="true"></i>
                                </span>
                                <span className="nane">
                                    {priceFilterName}
                                </span>
                                <span className="icon">
                                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </div>
                            {listOpen.isOpenPrice &&
                                <div className="wrap-dropdown-menusub-filter d-flex" ref={priceRef}>
                                    <div className="price-filter price-min">
                                        <div className="item-price title-price">
                                            Giá thấp nhất
                                        </div>
                                        {df_PRICE.map((item, index) => {
                                            return (
                                                <div className={"item-price " + (inputFormFilter.priceStart === item.value ? " active" : "")} onClick={(event) => onHandleUpdateDataFilterNews(event, { "priceStart": item.value })}>
                                                    {item.label}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="price-filter price-max">
                                        <div className="item-price title-price">
                                            Gía cao nhất
                                        </div>
                                        {df_PRICE.map((item, index) => {
                                            return (
                                                <div className={"item-price " + (inputFormFilter.priceEnd === item.value ? " active" : "")} onClick={(event) => onHandleUpdateDataFilterNews(event, { "priceEnd": item.value })} >
                                                    {item.label}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default SearchNewsHome