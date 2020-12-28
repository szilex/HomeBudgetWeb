import React from 'react';
import { Link } from 'react-router-dom';

const StrategiesList = ({ strategies }) => (
    <>
    {strategies.map((strategy, key) => (
        <Link className="strategy-list-item" key={key} to={{ pathname: `/strategy/id/${strategy.id}`, strategy: strategy }}>
            <h3>{strategy.name}</h3>
            <p>{strategy.description}</p>
        </Link>
    ))}
    </>
)

export default StrategiesList;