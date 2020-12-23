import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
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
import UserAccountPage from './pages/user/UserAccountPage'
import LoginNavBar from './components/LoginNavBar'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'

export default class App extends React.Component {

  componentDidMount() {
    document.title = "Home Budget"
  }


  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar/> */}
          <LoginNavBar/>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/changePassword" component={ChangePassword} />
                <Route exact path="/home" component={HomePage}/>
                <Route path="/strategy/id/:id" component={StrategyPage}/>
                <Route exact path="/strategy/current" component={CurrentStrategiesPage}/>
                <Route exact path="/strategy/archive" component={ArchiveStrategiesPage}/>
                <Route exact path="/strategy/new" component={NewStrategyPage}/>
                <Route path="/expense/id/:id" component={RegularExpensePage}/>
                <Route exact path="/expense/current" component={CurrentRegularExpensesPage}/>
                <Route exact path="/expense/new" component={NewRegularExpensePage}/>
                <Route exact path="/user" component={UserAccountPage}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
