import React, { useState, useEffect } from 'react';
import {Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import BudgetService from '../../services/BudgetService';
import { Redirect } from 'react-router-dom';

const CurrentBudgetPage = () => {
    
    const history = useHistory();
    const [budgetData, setBudgetData] = useState({ fetched: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await BudgetService.getCurrentBudget();
                setBudgetData({ budget: result, fetched: true });
            } catch (exception) {
                if (exception && exception.message && exception.message.includes(400)) {
                    setBudgetData({ fetched: true, error: "No current budget found" });
                } else {
                    setBudgetData({ fetched: true, error: "Server error" });
                }     
            }
        }
        fetchData();
    }, [])

    if (!budgetData.fetched) {
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
        if (budgetData.error) {
            return (
                <>
                    <h1>Error while retrieving strategies: {budgetData.error}</h1>
                    <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
                </>
            )
        } else {
            const link = "/budget/id/" + budgetData.budget.id;
            return (
                <>
                <Redirect to={{
                    pathname: link,
                    budget: budgetData.budget
                }}/>
                </>
            )
        }
    }
};

export default CurrentBudgetPage