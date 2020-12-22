import { useHistory } from 'react-router-dom';
import strategies from './strategy-contents'

const StrategyPage = ({ match }) => {

    const history = useHistory();
    const id = match.params.id;
    const strategy = strategies.find(strategy => strategy.id.toString() === id);

    if (!strategy) return <h1>Strategy does not exist</h1>

    return (
        <>
        <h1>Strategy: {strategy.name}</h1>
        <p>Description: {strategy.description}</p>
        <p>Category: {strategy.category}</p>
        <p>Goal: {strategy.goal}</p>
        <p>Start date: {strategy.startDate}</p>
        <p>Months: {strategy.months}</p>
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default StrategyPage;