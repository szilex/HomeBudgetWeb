import { useHistory } from 'react-router-dom';
import RegularExpenseChart from '../../components/expense/ExpenseChart'

const RegularExpensePage = (props) => {

    const history = useHistory();
    const expense = props.location.expense;

    if (!expense) return (
        <>
            <h1>Regular expense not found</h1>
            <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )

    return (
        <>
        <h1>Regular expense: {expense.name}</h1>
        <h3>Category: {expense.category}</h3>
        <h3>Amount: {expense.amount}</h3>
        <h3>Start date: {expense.startDate}</h3>
        <h3>Months: {expense.months}</h3>
        <RegularExpenseChart expense={expense}/>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default RegularExpensePage;