import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseList = ({ expenses }) => (
    <>
    {expenses.map((expense, key) => (
        <Link className="expense-list-item" key={key} to={`/expense/id/${expense.id}`}>
            <h3>{expense.name}</h3>
            <p>{expense.description}</p>
        </Link>
    ))}
    </>
)

export default ExpenseList;