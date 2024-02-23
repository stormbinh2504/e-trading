import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import thunkMiddleware from "redux-thunk";
import { createStateSyncMiddleware } from 'redux-state-sync';
import { persistStore } from 'redux-persist';

import createRootReducer from './reducers/rootReducer'
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from './../components/alert/Loading';


const globalVar = process.env.REACT_APP_API_URL

export const history = createBrowserHistory({ basename: globalVar });

const reduxStateSyncConfig = {
    whitelist: []
};

const middleware = [
    routerMiddleware(history),
    thunkMiddleware,
    createStateSyncMiddleware(reduxStateSyncConfig)
];

const rootReducer = createRootReducer(history);

export const reduxStore = createStore(
    rootReducer,
    applyMiddleware(...middleware)
)

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

const DataProvider = ({ children }) => {
    return (
        <Provider store={reduxStore}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}


export default DataProvider