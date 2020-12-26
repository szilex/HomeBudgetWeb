import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default class LoginNavBar extends React.Component {
    render() {
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/login">
                    <FontAwesomeIcon icon={faHome}/>{' '}
                    Home Budget Web
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"/>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link eventKey={2} href="/login/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>   
        )
    }
}