import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import ExpenseList from '../../components/expense/ExpenseList'
import StrategyList from "../../components/strategy/StrategyList"
import BudgetChart from '../../components/budget/BudgetChart'

const BudgetPage = (props) => {

    const history = useHistory();
    const budget = props.location.budget

    if (!budget) return (
        <>
        <h1>Budget not found</h1>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )

    console.log(budget)

    return (
        <>
        <h1>Budget</h1>
        <h3>Date: {moment(budget.date).format('MM-YYYY')}</h3>
        <h3>Income: {parseFloat(budget.income).toFixed(2)}</h3>
        { budget.customExpenses.length > 0 && 
            <>
                <h2>Custom expenses</h2>
                <ExpenseList expenses={budget.customExpenses}/><br/>
            </> 
        }
        { budget.regularExpenses.length > 0 && 
            <>
                <h2>Regular expenses</h2>
                <ExpenseList expenses={budget.regularExpenses} options={{showCategory: true, showAmount: true}}/><br/>
            </> 
        }
        { budget.strategies.length > 0 && 
            <>
                <h2>Strategies</h2>
                <StrategyList strategies={budget.strategies} options={{showCategory: true, showAmount: true}}/><br/>
            </> 
        }
        <BudgetChart budget={budget}/>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default BudgetPage;