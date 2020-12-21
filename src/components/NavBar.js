import React from 'react';
import { Link } from 'react-router-dom';

export default class NavigationBar extends React.Component {
    
    navStyle = {
        color: 'white',
        textDecoration: "none",
    };

    render() {
        return (
            <nav>
                <h3>Home Budget</h3>
                <ul className="nav-links">
                    <li>
                        <Link style={this.navStyle} to="/home">Home</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/budget/archive">Archive budgets</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/budget/current">Current budget</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/budget/new">New budget</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/expense/current">Current regular expenses</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/expense/new">New regular expenses</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/strategy/archive">Archive strategies</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/strategy/current">Current strategies</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/strategy/archive">New strategy</Link>
                    </li>
                    <li>
                        <Link style={this.navStyle} to="/user/account">My account</Link>
                    </li>
                </ul>
            </nav>
        )
    }
};