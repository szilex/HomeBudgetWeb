import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { AuthService } from '../../services/AuthService'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        const token = AuthService.currentTokenValue;
        if (!token) {
            return <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
        } 

        return <Component {...props}/>
    }}/>
}