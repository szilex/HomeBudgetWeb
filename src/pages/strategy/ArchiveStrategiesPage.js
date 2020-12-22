import React from 'react'
import strategies from './strategy-contents.js'
import StrategyList from "../../components/StrategyList"

const ArchiveStrategiesPage = () => (
    <>
    <h1>Archive strategies</h1>
    <StrategyList strategies={strategies}/>
    </>
);

export default ArchiveStrategiesPage