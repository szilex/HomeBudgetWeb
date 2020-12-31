import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/NavBar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { history } from "../../App"
import { AuthService } from "../../services/AuthService"

export default class NavBar extends React.Component {
    logout() {
        AuthService.logout();
        history.push('/login');
      }
    
    render() {
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/home">
                    <FontAwesomeIcon icon={faHome}/>{' '}
                    Home Budget Web
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Budget" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/budget/new">New budget</NavDropdown.Item>
                            <NavDropdown.Item href="/budget/current">Current budget</NavDropdown.Item>
                            <NavDropdown.Item href="/budget/archive">Archive budgets</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Regular expense" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/expense/new">New regular expense</NavDropdown.Item>
                            <NavDropdown.Item href="/expense/current">Current regular expenses</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Strategy" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/strategy/new">New strategy</NavDropdown.Item>
                            <NavDropdown.Item href="/strategy/current">Current strategies</NavDropdown.Item>
                            <NavDropdown.Item href="/strategy/archive">Archive strategies</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/user">My account</Nav.Link>
                        <Nav.Link eventKey={2} href="/login" onClick={ () => {AuthService.logout(); history.push("/login")} }>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>   
        )
    }
}