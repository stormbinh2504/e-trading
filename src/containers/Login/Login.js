import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import { sdkVNPTService, authService } from '../../services';
import { compressImage } from "../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { loginStart, loginSucess, loginFail } from '../../redux/actions'
import { alertType } from '../../redux/actions/alertActions'
import { ToastUtil } from '../../utils'
import { postDataAPI } from '../../utils/fetchData'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "./Login.scss"
import { appFirebase, uiConfig } from '../../firebase/firebaseconfig';
import { getAuth } from "firebase/auth"; // Update import statement for auth
import { firebaseMethods } from '../../firebase/firebaseMethods';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [userData, setUserData] = useState({
        "email": "",
        "password": "",
    })
    const [isShowPass, setIsShowPass] = useState(false)


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const ValidateForm = () => {
        if (!userData.email) {
            ToastUtil.error("Email không dược để trống");
            return false
        }
        if (!userData.password) {
            ToastUtil.error("Password không dược để trống");
            return false
        }

        return true
    }

    const Login = async () => {
        if (!ValidateForm()) {
            return
        }
        let body = {
            "email": userData.email,
            "password": userData.password
        }

        dispatch(alertType(true))
        dispatch(loginStart())

        try {
            const user = await firebaseMethods.login(body);
            dispatch(loginSucess(user));
            dispatch(alertType(false));
            history.push("/"); // Chuyển hướng đến trang đăng nhập
            ToastUtil.success("Đăng nhập thành công");
        } catch (error) {
            dispatch(loginFail());
            dispatch(alertType(false));
            ToastUtil.errorApi(error, "Đăng nhập không thành công");
        }
    }

    const DeleteAccount = async () => {
        await firebaseMethods.deleteAccount("donamkhanh@gmail.com")
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa thành công");
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Đăng ký không thành công");
            });
    }

    return (
        <div div className='login' >
            <div div className='form-login' >
                <h3 className="text-uppercase text-center mb-4">Đăng nhập</h3>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control-input" id="email"
                        name="email"
                        onChange={handleChangeInput} value={userData.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input type={isShowPass ? "text" : "password"} className="form-control-input" id="password"
                        name="password"
                        onChange={handleChangeInput} value={userData.password}
                    />
                    <span className="icon-show-pass" onClick={() => { setIsShowPass(!isShowPass) }}>
                        {isShowPass && <i class="fa fa-eye" aria-hidden="true"></i>}
                        {!isShowPass && <i class="fa fa-eye-slash" aria-hidden="true"></i>}
                    </span>
                </div>
                < button
                    type="submit"
                    className="btn btn-submit w-100"
                    // disabled={email && password ? false : true}
                    onClick={Login}
                >
                    Đăng nhập
                </button>
                {/* < button
                    className="btn btn-submit w-100"
                    // disabled={email && password ? false : true}
                    onClick={DeleteAccount}
                >
                    Xóa Account
                </button> */}
                <p className="my-2">
                    Bạn chưa có tài khoản{" "}
                    <Link to="/register" style={{ color: "crimson" }}>
                        Đăng ký ngay
                    </Link>
                </p>
            </div >
            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(appFirebase)} /> */}
        </div >
    )
}

export default Login