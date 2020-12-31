import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import RegularExpenseList from '../../components/expense/ExpenseList'
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
        {/* <div style={{overflow: "hidden"}}>
            <h3 style={{float: "left", marginLeft: 200}}>Date: {moment(budget.date).format('MM-YYYY')}</h3>
            <h3 style={{float: "right", marginRight: 200}}>Income: {parseFloat(budget.income).toFixed(2)}</h3>
        </div> */}
        <h3>Date: {moment(budget.date).format('MM-YYYY')}</h3>
        <h3>Income: {parseFloat(budget.income).toFixed(2)}</h3>
        { budget.customExpenses.length > 0 && 
            <>
                <h2>Custom expenses</h2>
                <RegularExpenseList expenses={budget.customExpenses}/><br/>
            </> 
        }
        { budget.regularExpenses.length > 0 && 
            <>
                <h2>Regular expenses</h2>
                <RegularExpenseList expenses={budget.regularExpenses}/><br/>
            </> 
        }
        { budget.strategies.length > 0 && 
            <>
                <h2>Strategies</h2>
                <StrategyList strategies={budget.strategies}/><br/>
            </> 
        }
        <BudgetChart budget={budget}/>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default BudgetPage;