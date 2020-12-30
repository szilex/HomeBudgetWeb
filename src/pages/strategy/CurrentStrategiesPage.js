import React, {useState, useEffect } from 'react'
import {Spinner} from 'react-bootstrap'
import StrategyList from "../../components/StrategyList"
import StrategyService from '../../services/StrategyService'

const CurrentStrategiesPage = () => {
    
    const [strategiesData, setStrategiesData] = useState({ fetched: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await StrategyService.getCurrentStrategies()
                console.log(result)
                setStrategiesData({ strategies: result, fetched: true })
            } catch (exception) {
                if (exception && exception.message && exception.message.includes(400)) {
                    setStrategiesData({ fetched: true, error: "No strategies found" })
                } else {
                    setStrategiesData({ fetched: true, error: "Server error" })
                }     
            }
        }
        fetchData();
    }, [])

    if (!strategiesData.fetched) {
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
        if (strategiesData.error) {
            return (
                <h1>Error while retrieving strategies: {strategiesData.error}</h1>
            )
        } else {
            return (
                <>
                <h1>Current strategies</h1><br/>
                <StrategyList strategies={strategiesData.strategies}/>
                </>
            )
        }
    }
};

export default CurrentStrategiesPage