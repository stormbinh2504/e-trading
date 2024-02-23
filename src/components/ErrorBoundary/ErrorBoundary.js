import React, { Component } from 'react';
//https://codepen.io/tag/404-page
import './ErrorBoundary.scss';

class ErrorBoundary extends Component {

    state = { hasError: false };

    reloadContent = () => {
        this.setState({ hasError: false });
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-wrapper">
                        <div class="gif">
                            <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
                        </div>
                        <div class="content">
                            <h1 class="main-heading">Có lỗi xảy ra yêu cầu tải lại trang</h1>
                            <p>
                                ...maybe the page you're looking for is not found or never existed.
                            </p>
                            <button onClick={this.reloadContent}>
                                Tải lại
                                <i class="far fa-hand-point-right">
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;