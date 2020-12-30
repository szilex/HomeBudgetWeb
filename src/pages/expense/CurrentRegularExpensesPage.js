import React, {useState, useEffect } from 'react'
import {Spinner} from 'react-bootstrap'
import RegularExpenseList from '../../components/RegularExpenseList'
import RegularExpenseService from '../../services/RegularExpenseService'

const CurrentRegularExpensesPage = () => {

    const [expensesData, setExpensesData] = useState({ fetched: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await RegularExpenseService.getCurrentRegularExpenses()
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
                <h1>Error while retrieving strategies: {expensesData.error}</h1>
            )
        } else {
            return (
                <>
                <h1>Current regular expenses</h1><br/>
                <RegularExpenseList expenses={expensesData.expenses}/>
                </>
            )
        }
    }
}

export default CurrentRegularExpensesPage