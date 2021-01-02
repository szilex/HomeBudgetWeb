import React, {useState, useEffect } from 'react'
import {Spinner} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService'

const UserAccountPage = () => {
    
    const history = useHistory();
    const [userData, setUserData] = useState({ fetched: false })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await UserService.getCurrentUser()
                console.log(result)
                setUserData({ user: result, fetched: true })
            } catch (exception) {
                if (exception && exception.message && exception.message.includes(400)) {
                    setUserData({ fetched: true, error: "No regular expenses found" })
                } else {
                    setUserData({ fetched: true, error: "Server error" })
                }     
            }
        }
        fetchData();
    }, [])

    if (!userData.fetched) {
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
        if (userData.error) {
            return (
                <>
                    <h1>Error while retrieving user data: {userData.error}</h1>
                    <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
                </>
            )
        } else {
            return (
                <>
                <h1>Account details</h1>
                <h3>Login: {userData.user.login}</h3>
                <h3>First name: {userData.user.firstName}</h3>
                <h3>Last name: {userData.user.lastName}</h3>
                <button className="btn btn-primary btn-block" type="submit" onClick={() => history.goBack()}>Go back</button>
                </>
            )
        }
    }
}

export default UserAccountPage;