import actionTypes from '../actions/actionTypes'
import { TYPE_USER } from './../../utils';

const initialState = {
    typeUser: TYPE_USER.CUSTOMER,
    filterNews: {
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
    },
    filterAgency: {
        "nameSearch": null,
        "provinceCode": null,
    },
    filterBlogs: {
        "searchName": null,
    },
    listBanner: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TYPE_USER":
            return {
                ...state,
                typeUser: action.data,
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                typeUser: initialState.typeUser,
                filterNews: initialState.filterNews,
                filterAgency: initialState.filterAgency,
            };
        case "UPDATE_DATA_FILTER_NEWS":
            console.log("binh_filterNews", action.data)
            return {
                ...state,
                filterNews: {
                    ...state.filterNews,
                    ...action.data
                }
            };
        case "UPDATE_DATA_FILTER_AGENCY":
            return {
                ...state,
                filterAgency: {
                    ...state.filterAgency,
                    ...action.data
                }
            };
        case "UPDATE_DATA_BLOG":
            return {
                ...state,
                filterBlogs: {
                    ...state.filterBlogs,
                    ...action.data
                }
            };
        case "LOAD_DATA_BANNER":
            console.log("binh_filterNews", action.data)
            return {
                ...state,
                listBanner: action.data
            };
        default:
            return state;
    }
}


export default appReducer