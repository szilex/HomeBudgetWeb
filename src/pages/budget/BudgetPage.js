import { useHistory } from 'react-router-dom';

const BudgetPage = ({ match }) => {

    const history = useHistory();
    const id = match.params.id;

    return (
        <>
        <h1>Budget Page: </h1>
        <p>Index: {id}</p>
        
        <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
        </>
    )
}

export default BudgetPage;