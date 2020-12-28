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
        return (
            <>
            <h1>Welcome to Home Budget Web app</h1>
            </>
        )
    }
}

export default HomePage;