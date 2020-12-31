import { useHistory } from 'react-router-dom';
import StrategyChart from '../../components/strategy/StrategyChart'

const StrategyPage = (props) => {

    const history = useHistory();
    const strategy = props.location.strategy;

    if (!strategy) return (
        <>
            <h1>Strategy not found</h1>
            <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>    
    )

    return (
        <>
        <h1>Strategy: {strategy.name}</h1>
        <h3>Description: {strategy.description}</h3>
        <h3>Category: {strategy.category}</h3>
        <h3>Goal: {strategy.goal}</h3>
        <h3>Start date: {strategy.startDate}</h3>
        <h3>Months: {strategy.months}</h3>
        <StrategyChart strategy={strategy}/>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default StrategyPage;