import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/user/LoginPage"
import Register from "./pages/user/RegisterPage"
import ChangePassword from "./pages/user/ChangePasswordPage"

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>Home Budget Web</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/changePassword" component={ChangePassword} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
