import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import StrategyList from "../../components/strategy/StrategyList"
import StrategyService from '../../services/StrategyService'

const ArchiveStrategiesPage = () => {
    
    const history = useHistory();
    const [strategiesData, setStrategiesData] = useState({ fetched: false, status: "error" })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await StrategyService.getArchiveStrategies()
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
                <>
                    <h1>Error while retrievieng strategies: {strategiesData.error}</h1>
                    <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
                </>
            )
        } else {
            return (
                <>
                <h1>Current strategies</h1>
                <StrategyList strategies={strategiesData.strategies}/>
                </>
            )
        }
    }
};

export default ArchiveStrategiesPage