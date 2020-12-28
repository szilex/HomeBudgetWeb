import React from 'react';
import { Link } from 'react-router-dom';

const RegularExpenseList = ({ expenses }) => (
    <>
    {expenses.map((expense, key) => (
        <Link className="expense-list-item" key={key} to={{ pathname:`/expense/id/${expense.id}`, expense: expense }}>
            <h3>{expense.name}</h3>
            <p>{expense.description}</p>
        </Link>
    ))}
    </>
)

export default RegularExpenseList;