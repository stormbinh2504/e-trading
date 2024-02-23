import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PATH_NAME } from "../utils";

// isLoggedIn, isLogginFail, isLoggingIn
const defaultPath = PATH_NAME.LOGIN
const PrivateRoute = ({ component: Component, isLoggedIn, isLogginFail, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isLoggedIn && !isLogginFail ?
                (<Redirect to={defaultPath} />) :
                (<Component {...props} />)}
    />
);

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    isLogginFail: state.user.isLogginFail,
});

export default connect(mapStateToProps)(PrivateRoute);