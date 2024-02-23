import React, { Component, Fragment } from 'react';
import './CustomToast.scss';

class CustomToast extends Component {

    render() {
        const { type, titleId, message, messageId, time } = this.props;
        return (
            <Fragment>
                <div className="custom-toast">
                    <div className="toast-title">
                        {/* {time && (
                            <span className="date">
                                <FormattedTime hour='numeric' minute='numeric' second='numeric' hour12={true} value={time} />
                            </span>
                        )} */}
                        <div className="icon-type">
                            {
                                type === "SUCCESS" && <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                            }
                            {
                                type === "ERROR" && <i className="fa fa-fw fa-exclamation-triangle" />

                            }
                            {
                                type === "WARN" && <i className="fa fa-fw fa-exclamation-triangle" />

                            }
                            {
                                type === "INFO" && <i className="fa fa-fw fa-exclamation-triangle" />

                            }
                        </div>
                        <div className="title">
                            {titleId}
                        </div>
                    </div>
                    {
                        (message && typeof message === 'object') ?
                            (
                                message && message.length > 0 && message.map((msg, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="toast-content">{msg}</div>
                                        </Fragment>
                                    )
                                })
                            )
                            :
                            <div className="toast-content">
                                {message ? message : (messageId ? messageId : null)}
                            </div>
                    }
                </div>
            </Fragment>
        );
    }
}

export class CustomToastCloseButton extends Component {

    render() {
        return (
            <button type="button" className="toast-close" onClick={this.props.closeToast}>
                <i className="fa fa-fw fa-times-circle" />
            </button>
        );
    }
}

export default CustomToast;