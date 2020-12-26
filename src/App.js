import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history' 
import { AuthService } from "./services/AuthService"

import { Router, Switch, Route, } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute';
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
import LoginRedirect from './components/LoginRedirect'

export const history = createBrowserHistory();

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentToken: null,
    }
  }

  componentDidMount() {
    document.title = "Home Budget"
    AuthService.currentToken.subscribe(x => this.setState({ currentToken: x }));
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginRedirect}/>
            <Route path="/login">
              <LoginNavBar/>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/login/register" component={Register} />
                    <Route exact path="/login/changePassword" component={ChangePassword} />
                    <Route component={NotFoundPage}/>
                  </Switch>
                </div>
              </div>
            </Route>
            <Route path="/">
              <NavBar/>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Switch>
                    <PrivateRoute exact path="/home" component={HomePage}/>
                    <PrivateRoute path="/strategy/id/:id" component={StrategyPage}/>
                    <PrivateRoute exact path="/strategy/current" component={CurrentStrategiesPage}/>
                    <PrivateRoute exact path="/strategy/archive" component={ArchiveStrategiesPage}/>
                    <PrivateRoute exact path="/strategy/new" component={NewStrategyPage}/>
                    <PrivateRoute path="/expense/id/:id" component={RegularExpensePage}/>
                    <PrivateRoute exact path="/expense/current" component={CurrentRegularExpensesPage}/>
                    <PrivateRoute exact path="/expense/new" component={NewRegularExpensePage}/>
                    <PrivateRoute exact path="/user" component={UserAccountPage}/>
                    <PrivateRoute component={NotFoundPage}/>
                  </Switch>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
