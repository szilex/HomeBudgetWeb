import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history' 
import { AuthService } from "./services/AuthService"

import { Router, Switch, Route, } from "react-router-dom";
import { PrivateRoute } from './components/navigation/PrivateRoute';
import LoginPage from "./pages/user/LoginPage"
import RegisterPage from "./pages/user/RegisterPage"
import ChangePasswordPage from "./pages/user/ChangePasswordPage"
import BudgetPage from "./pages/budget/BudgetPage"
import NewBudgetPage from "./pages/budget/NewBudgetPage"
import CurrentBudgetPage from "./pages/budget/CurrentBudgetPage"
import ArchiveBudgetsPage from "./pages/budget/ArchiveBudgetsPage"
import StrategyPage from "./pages/strategy/StrategyPage"
import CurrentStrategiesPage from "./pages/strategy/CurrentStrategiesPage"
import ArchiveStrategiesPage from './pages/strategy/ArchiveStrategiesPage';
import NewStrategyPage from './pages/strategy/NewStrategyPage'
import RegularExpensePage from './pages/expense/RegularExpensePage';
import CurrentRegularExpensesPage from './pages/expense/CurrentRegularExpensesPage'
import NewRegularExpensePage from './pages/expense/NewRegularExpensePage'
import NotFoundPage from './pages/NotFoundPage'
import UserAccountPage from './pages/user/UserAccountPage'
import LoginNavBar from './components/navigation/LoginNavBar'
import NavBar from './components/navigation/NavBar'
import HomePage from './pages/HomePage'
import LoginRedirect from './components/navigation/LoginRedirect'

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
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/login/register" component={RegisterPage} />
                    <Route exact path="/login/changePassword" component={ChangePasswordPage} />
                    <Route component={NotFoundPage}/>
                  </Switch>
                </div>
              </div>
            </Route>
            <PrivateRoute path="/">
              <div>
              
              <div className="page-wrapper">
              <NavBar/>
                <div className="page-inner">
                  <Switch>
                    <PrivateRoute exact path="/home" component={HomePage}/>
                    <PrivateRoute path="/budget/id/:id" component={BudgetPage}/>
                    <PrivateRoute exact path="/budget/current" component={CurrentBudgetPage}/>
                    <PrivateRoute exact path="/budget/archive" component={ArchiveBudgetsPage}/>
                    <PrivateRoute exact path="/budget/new" component={NewBudgetPage}/>
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
              </div>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}
