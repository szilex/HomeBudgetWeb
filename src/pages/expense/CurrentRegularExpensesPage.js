import { faTruckMonster } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect } from 'react'
import {Spinner} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import RegularExpenseList from '../../components/expense/ExpenseList'
import ExpenseService from '../../services/ExpenseService'

const CurrentRegularExpensesPage = () => {

    const history = useHistory();
    const [expensesData, setExpensesData] = useState({ fetched: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ExpenseService.getCurrentRegularExpenses()
                console.log(result)
                setExpensesData({ expenses: result, fetched: true })
            } catch (exception) {
                if (exception && exception.message && exception.message.includes(400)) {
                    setExpensesData({ fetched: true, error: "No regular expenses found" })
                } else {
                    setExpensesData({ fetched: true, error: "Server error" })
                }     
            }
        }
        fetchData();
    }, [])

    const deleteExpense = async (id) => {
        try {
            const result = await ExpenseService.deleteRegularExpense(id)
            console.log(result)
            history.go(0);
        } catch (exception) {
            console.log(exception)
        }
    }

    if (!expensesData.fetched) {
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
        if (expensesData.error) {
            return (
                <>
                    <h1>Error while retrieving strategies: {expensesData.error}</h1>
                    <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
                </>
            )
        } else {
            return (
                <>
                <h1>Current regular expenses</h1>
                <RegularExpenseList expenses={expensesData.expenses} options={{showCategory: true, showAmount: true, showLink: true, showDelete: faTruckMonster, onDelete: deleteExpense}}/>
                </>
            )
        }
    }
}

export default CurrentRegularExpensesPage