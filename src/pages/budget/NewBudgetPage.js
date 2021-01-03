import React from "react";
import { Spinner } from 'react-bootstrap'
import { Redirect, withRouter } from "react-router-dom";
import BudgetForm from '../../components/budget/BudgetForm'
import AuthService from '../../services/AuthService'
import ExpenseService from '../../services/ExpenseService'
import StrategyService from '../../services/StrategyService'
import BudgetService from '../../services/BudgetService'
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import * as moment from 'moment';

const styles = theme => ({
    textField: {
        width: 500
    },
    select: {
        textAlign: 'left'
    },
    menuItem: {
        textAlign: 'left'
    },
    helperText: {
        color: red[400]
    },
})

class NewBudgetPage extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = { props: props, income: 0, fetched: false, currentDate: moment(), date: null};
    }

    async componentDidMount() {
        
        var categories, regularExpenses, strategies;

        try {
            const result = await ExpenseService.getExpenseCategories();
            console.log(result);
            categories = result;
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ error: "Could not obtain categories" })
            } else {
                this.setState({ error: "Server error" })
            }
        } 

        try {
            const result = await ExpenseService.getCurrentRegularExpenses();
            console.log(result);
            regularExpenses = result
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ error: "No regular expense found" })
            } else {
                this.setState({ error: "Server error" })
            }
        } 

        try {
            const result = await StrategyService.getCurrentStrategies();
            console.log(result)
            strategies = result
        } catch(exception) {
            if (exception && exception.message && exception.message.includes(400)) {
                this.setState({ error: "No strategy found" })
            } else {
                this.setState({ error: "Server error" })
            }
        } 

        this.setState({ categories: categories, customExpenses: [], regularExpenses: regularExpenses, strategies: strategies, categoryId: '', fetched: true})
    }

    render() {
        
        const handleSubmit = async (event) => {
            let result = await BudgetService.postBudget(event.target.value);
            return result;
        }

        if (!AuthService.currentTokenValue) {
            AuthService.logout();
            return <Redirect to={"/login"}/>
        } else {
            if (!this.state.fetched) {
                return (
                    <div className="spinner">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>  
                        <br/><br/>
                        <h2>Fetching content...</h2>  
                    </div>
                )    
            } else {
                if (this.state.error) {
                    return (
                        <>
                        <h1>Error while retrieving regular expenses: {this.state.error}</h1>
                        <button className="btn btn-primary btn-block" type="submit" onClick={() => this.props.history.goBack()}>Go back</button>
                        </>
                    )
                } else {
                    return(
                        <div className="container">
                            <div className="strategy-form-wrapper" >
                                <h2>New budget</h2>
                                <BudgetForm categories={this.state.categories} regularExpenses={this.state.regularExpenses} strategies={this.state.strategies} onSubmit={handleSubmit}/>
                        </div>
                    </div>
                    )
                }
            }
        }
    }
}
  
export default withRouter(withStyles(styles)(NewBudgetPage))

