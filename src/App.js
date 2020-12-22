import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/user/LoginPage"
import Register from "./pages/user/RegisterPage"
import ChangePassword from "./pages/user/ChangePasswordPage"
import StrategyPage from "./pages/strategy/StrategyPage"
import CurrentStrategiesPage from "./pages/strategy/CurrentStrategiesPage"
import ArchiveStrategiesPage from './pages/strategy/ArchiveStrategiesPage';
import NewStrategyPage from './pages/strategy/NewStrategyPage'
import RegularExpensePage from './pages/expense/RegularExpensePage';
import CurrentRegularExpensesPage from './pages/expense/CurrentRegularExpensesPage'
import NewRegularExpensePage from './pages/expense/NewRegularExpensePage'
import NotFoundPage from './pages/NotFoundPage'


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
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/changePassword" component={ChangePassword} />
              <Route path="/strategy/id/:id" component={StrategyPage}/>
              <Route exact path="/strategy/current" component={CurrentStrategiesPage}/>
              <Route exact path="/strategy/archive" component={ArchiveStrategiesPage}/>
              <Route exact path="/strategy/new" component={NewStrategyPage}/>
              <Route path="/expense/id/:id" component={RegularExpensePage}/>
              <Route exact path="/expense/current" component={CurrentRegularExpensesPage}/>
              <Route exact path="/expense/new" component={NewRegularExpensePage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
