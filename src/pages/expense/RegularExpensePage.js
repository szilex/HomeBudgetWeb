import { useHistory } from 'react-router-dom';
import expenses from './regular-expenses-content'

const RegularExpensePage = ({ match }) => {

    const history = useHistory();
    const id = match.params.id;
    const expense = expenses.find(strategy => strategy.id.toString() === id);

    if (!expense) return <h1>Strategy does not exist</h1>

    return (
        <>
        <h2>Expense: {expense.name}</h2>
        <p>Category: {expense.category}</p>
        <p>Amount: {expense.amount}</p>
        <p>Start date: {expense.startDate}</p>
        <p>Months: {expense.months}</p>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default RegularExpensePage;