import React from 'react';
import { Image } from 'react-bootstrap'
import AuthService from '../services/AuthService'
import HomeLogo from '../logo.png'


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
            <Image src={HomeLogo} alt="Home Budget icon" thumbnail style={{backgroundColor: '#0B0C10', borderColor: '#FFFFFF', color: '#45A293', fill: '#FFFFFF',  borderRadius: '50px', height: '40%', width: '40%', marginBottom: 20,  }}/>
            <h1>Welcome to Home Budget Web app</h1>
            </>
        )
    }
}

export default HomePage;