import React, { useState, useEffect } from 'react'
import './App.scss';
import "../src/styles/styles.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter as Router } from 'connected-react-router';
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Alert from "./components/alert/Alert";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import { PATH_NAME, TYPE_USER } from './utils';
import HeaderBroker from './containers/Header/HeaderBroker';
import { history } from './redux/store'
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import $ from 'jquery';
import FirebaseTestImage from './components/FirebaseTestImage/FirebaseTestImage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchUserInfoFromSavedSession, initializeApp } from './redux/actions';
import Footer from './containers/Footer/Footer';
import _ from 'lodash';
import BinanceTrading from './containers/Trading/BinanceTrading/BinanceTrading';
import MexcTrading from './containers/Trading/MexcTrading/MexcTrading';


if (typeof window !== "undefined") {
  injectStyle();
}
let a = "Aer_YjXKNuOt1L4iknw2E298jO6dEOxMLI5UZdzEWStbbedIaYdqCr-eIFU_KSbK-kxGNI62T8aVsZtV"
let pathName = window.location.pathname
let isDashboard = pathName.includes("/dashboard")
function App() {
  const state = useSelector((state) => state);
  const { auth, app, user } = state
  const { userInfo } = user
  const dispatch = useDispatch()

  const [isOpenModalFirstLogin, setIsOpenModalFirstLogin] = useState(false);

  console.log("render_app", state)
  const scrollTopAnimated = () => {
    $('#scrollToTop').on('click', function () {
      $("html, body").animate({ scrollTop: 0 }, 1200);
    })
  }

  useEffect(() => {
    // dispatch(initializeApp())
    scrollTopAnimated()
  }, []);


  useEffect(() => {
    console.log("binh_app", { userInfo }, _.isEmpty(userInfo.phone))
    if (userInfo && _.isEmpty(userInfo.phone)) {
      setIsOpenModalFirstLogin(true)
    } else {
      setIsOpenModalFirstLogin(false)
    }
  }, [userInfo]);

  // console.log("binh_app", { userInfo }, _.isEmpty(userInfo.phone))
  return (
    <PayPalScriptProvider
      // deferLoading={true}
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    // options={{ "client-id": a }}
    >
      <div className="App">
        <Router history={history}>
          <ErrorBoundary>

            <ScrollToTop />
            <Alert />
            {
              app.typeUser === TYPE_USER.CUSTOMER && < Header />
            }
            {/* {
              app.typeUser === TYPE_USER.BROKER && < HeaderBroker />
            }  */}
            <Switch>
              <div className="main">
                {app.typeUser === TYPE_USER.CUSTOMER &&
                  < div id="container-page-content" className="container-page-content ">
                    <Route exact path="/home" component={Home} />
                    <Route exact path={PATH_NAME.BINANCE} component={BinanceTrading} />
                    <Route exact path={PATH_NAME.MEXC} component={MexcTrading} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/firebase" component={FirebaseTestImage} />
                  </div>
                }
              </div>
            </Switch>
            {/* {
              app.typeUser === TYPE_USER.CUSTOMER && <Footer />
            } */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ErrorBoundary>
        </Router>
      </div>
    </PayPalScriptProvider >
  );
}

export default App;
