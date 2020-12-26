import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/ResponseHandler'

const API_URL = "http://localhost:8080";

const currentTokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')))

export const AuthService = {
    login,
    logout,
    currentToken: currentTokenSubject.asObservable(),
    get currentTokenValue () { return currentTokenSubject.value }
}

function login(login, password) {
    const result = axios
            .post(API_URL + '/login', {
                login: login,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleResponse)
            .then(response => {
                localStorage.setItem('token', JSON.stringify(response.headers.authorization));
                currentTokenSubject.next(response.headers.authorization);
                return response.headers.authorization;
            }, (error) => {
                if (error) {
                    return error;
                } else {
                    return null;
                }
            })
        return result;
}

function logout() {
    localStorage.removeItem('token');
    currentTokenSubject.next(null);
}

export default AuthService;