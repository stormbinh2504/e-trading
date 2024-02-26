
import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import CustomToast from '../components/CustomToast/CustomToast';

const TYPE_SUCCESS = 'SUCCESS';
const TYPE_INFO = 'INFO';
const TYPE_WARN = 'WARN';
const TYPE_ERROR = 'ERROR';

class ToastUtil {

    static success(title, message) {
        this.show(TYPE_SUCCESS, title, message);
    }

    static info(title, message) {
        this.show(TYPE_INFO, title, message);
    }

    static warn(title, message) {
        this.show(TYPE_WARN, title, message);
    }

    static error(title, message) {
        this.show(TYPE_ERROR, title, message);
    }

    static successRaw(title, message) {
        this.show(TYPE_SUCCESS, title, message, true);
    }

    static errorRaw(title, message, autoCloseDelay = 10000) {
        this.show(TYPE_ERROR, title, message, true, autoCloseDelay);
    }

    static errorApi(error, title = 'Thất bại', autoCloseDelay = 10000) {
        if (axios.isCancel(error)) {
            // Do nothing if request was cancelled
            return;
        }
        let message = null;
        let messageId = 'Có lỗi xảy ra';
        if (error.httpStatusCode >= 500) {
            messageId = 'Lỗi kết nối';
        } else if (error.httpStatusCode < 500 && error.httpStatusCode >= 400) {
            if (error.httpStatusCode === 400) {
                messageId = 'Yêu cầu không hợp lệ';
            } else if (error.httpStatusCode === 403) {
                messageId = 'Xác thực không thành công';
            }
        } else {
            // Request fail even server was returned a success response
            if (error.errorMessage) {
                message = error.errorMessage
            }
        }

        if (error && error.errorMessage) {
            messageId = error.errorMessage
        }
        messageId = error.httpStatusCode;
        toast.error(<CustomToast type="ERROR" titleId={title} message={message} messageId={messageId} time={new Date()} />, {
            position: toast.POSITION.BOTTOM_RIGHT,
            pauseOnHover: true,
            autoClose: autoCloseDelay
        });
    }

    static show(type, title, message, rawMessage = false, autoCloseDelay = 10000) {
        const content = <CustomToast type={type} titleId={title} messageId={rawMessage ? null : message} message={rawMessage ? message : null} time={new Date()} />;
        const options = {
            position: toast.POSITION.BOTTOM_RIGHT,
            pauseOnHover: true,
            autoClose: autoCloseDelay
        };

        switch (type) {
            case TYPE_SUCCESS:
                toast.success(content, options);
                break;
            case TYPE_INFO:
                toast.info(content, options);
                break;
            case TYPE_WARN:
                toast.warn(content, options);
                break;
            case TYPE_ERROR:
                toast.error(content, options);
                break;
            default:
                break;
        }
    }
}

export default ToastUtil;