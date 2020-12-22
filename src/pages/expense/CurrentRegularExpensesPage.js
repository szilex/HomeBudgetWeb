import React from 'react'
import expenses from './regular-expenses-content'
import ExpenseList from '../../components/ExpenseList'

const CurrentRegularExpensesPage = () => (
    <>
    <h1>Current regular expenses</h1>
    <ExpenseList expenses={expenses}/>
    </>
);

export default CurrentRegularExpensesPage