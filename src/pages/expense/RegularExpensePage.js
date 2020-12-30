import { useHistory } from 'react-router-dom';
import RegularExpenseChart from '../../components/RegularExpenseChart'

const RegularExpensePage = (props) => {

    const history = useHistory();
    const expense = props.location.expense;

    if (!expense) return <h1>Regular expense not found</h1>

    return (
        <>
        <h1>Regular expense: {expense.name}</h1>
        <p>Category: {expense.category}</p>
        <p>Amount: {expense.amount}</p>
        <p>Start date: {expense.startDate}</p>
        <p>Months: {expense.months}</p>
        <RegularExpenseChart expense={expense}/>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default RegularExpensePage;