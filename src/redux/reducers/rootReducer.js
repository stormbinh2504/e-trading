import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { persistReducer, createTransform } from 'redux-persist';

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import appReducer from './appReducer'
import userReducer from './userReducer'

const persistCommonConfig = {
    // storage: new CookieStorage(Cookies),
    storage: storage,
    stateReconciler: autoMergeLevel2,
};


const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['typeUser']
};

const authPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['']
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'token', 'refreshToken']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    app: persistReducer(appPersistConfig, appReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    alert: alertReducer,
    user: persistReducer(userPersistConfig, userReducer),
});
