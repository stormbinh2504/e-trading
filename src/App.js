import React, { useState, useEffect, Suspense } from 'react'
import './App.scss';
import "../src/styles/styles.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter as Router } from 'connected-react-router';
import { useSelector, useDispatch } from "react-redux";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Alert from "./components/alert/Alert";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import { PATH_NAME, TYPE_USER, ToastUtil } from './utils';
import HeaderBroker from './containers/Header/HeaderBroker';
import { history } from './redux/store'
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import $ from 'jquery';
import FirebaseTestImage from './components/FirebaseTestImage/FirebaseTestImage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchUserInfoFromSavedSession, initializeApp, logout, loginSucess, alertType } from './redux/actions';
import Footer from './containers/Footer/Footer';
import _ from 'lodash';
import BinanceTrading from './containers/Trading/BinanceTrading/BinanceTrading';
import MexcTrading from './containers/Trading/MexcTrading/MexcTrading';
import PrivateRouter from './customRouter/PrivateRouter';
import { appFirebase } from './firebase/firebaseconfig';
import { getAuth } from "firebase/auth"; // Update import statement for auth


if (typeof window !== "undefined") {
  injectStyle();
}
let a = "Aer_YjXKNuOt1L4iknw2E298jO6dEOxMLI5UZdzEWStbbedIaYdqCr-eIFU_KSbK-kxGNI62T8aVsZtV"
let pathName = window.location.pathname
let isDashboard = pathName.includes("/dashboard")
function App() {
  const state = useSelector((state) => state);
  const { auth, app, user, router } = state
  const { userInfo, isLoggedIn } = user
  const { location } = router
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

  // console.log("binh_app", { userInfo }, _.isEmpty(userInfo.phone))
  return (
    <div className="App">
      <Router history={history}>
        <ScrollToTop />
        <Suspense fallback={<div>Loading....</div>}>
          <ErrorBoundary>
            <Alert />
            < Header />
            {/* {
              app.typeUser === TYPE_USER.BROKER && < HeaderBroker />
            }  */}
            <Switch>
              <div className="main">
                < div id="container-page-content" className="container-page-content ">
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <PrivateRouter exact path={PATH_NAME.BINANCE} component={BinanceTrading} />
                  <PrivateRouter exact path={PATH_NAME.MEXC} component={MexcTrading} />
                  {/* <PrivateRoute exact path="/firebase" component={FirebaseTestImage} /> */}
                </div>
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
        </Suspense>
      </Router>
    </div >
  );
}

export default App;
