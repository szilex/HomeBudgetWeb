import { useHistory } from 'react-router-dom';

const StrategyPage = (props) => {

    const history = useHistory();
    //const id = props.match.params.id;
    const strategy = props.location.strategy;

    if (!strategy) return <h1>Strategy not found</h1>

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