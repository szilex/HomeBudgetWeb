import React from 'react';

import AuthService from '../services/AuthService'

class HomePage extends React.Component {
   
    constructor(props) {
        super(props);

        this.state = {
            currentToken: AuthService.currentTokenValue,
        }
    }

    render() {
        const { currentToken } = this.state;
        return (
            <>
            <h1>Welcome to Home Budget Web app</h1>
            <p>Your current JWT token:<br />{currentToken}</p>
            </>
        )
    }
}

export default HomePage;