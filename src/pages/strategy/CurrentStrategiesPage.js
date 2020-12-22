import React from 'react'
import strategies from './strategy-contents.js'
import StrategyList from "../../components/StrategyList"

const CurrentStrategiesPage = () => (
    <>
    <h1>Current strategies</h1>
    <StrategyList strategies={strategies}/>
    </>
);

export default CurrentStrategiesPage