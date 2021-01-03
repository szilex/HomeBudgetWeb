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
            <Image src={HomeLogo} alt="Home Budget icon" thumbnail style={{background: 'linear-gradient(to right, #c56400, #f7bf6a)', borderRadius: '50px', borderWidth: "2dp" , height: '35%', width: '35%', marginBottom: 20,  }}/>
            <h1>Welcome to Home Budget Web app</h1>
            </>
        )
    }
}

export default HomePage;