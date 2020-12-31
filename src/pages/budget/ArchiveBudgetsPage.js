import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import BudgetList from "../../components/budget/BudgetList"
import BudgetService from '../../services/BudgetService'

const ArchiveBudgetsPage = () => {
    
    const history = useHistory();
    const [budgetsData, setBudgetsData] = useState({ fetched: false, status: "error" })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await BudgetService.getArchiveBudgets()
                console.log(result)
                setBudgetsData({ budgets: result, fetched: true })
            } catch (exception) {
                if (exception && exception.message && exception.message.includes(400)) {
                    setBudgetsData({ fetched: true, error: "No budgets found" })
                } else {
                    setBudgetsData({ fetched: true, error: "Server error" })
                }     
            }
        }
        fetchData();
    }, [])

    if (!budgetsData.fetched) {
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
        if (budgetsData.error) {
            return (
                <>
                    <h1>Error while retrievieng budgets: {budgetsData.error}</h1>
                    <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
                </>
            )
        } else {
            return (
                <>
                <h1>Archive budgets</h1>
                <BudgetList budgets={budgetsData.budgets}/>
                </>
            )
        }
    }
};

export default ArchiveBudgetsPage