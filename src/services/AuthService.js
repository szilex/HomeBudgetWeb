import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
//import { handleResponse } from '../helpers/ResponseHandler'

const API_URL = "http://localhost:8080";

const currentTokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')))

export const AuthService = {
    login,
    register,
    changePassword,
    logout,
    currentToken: currentTokenSubject.asObservable(),
    get currentTokenValue () { return currentTokenSubject.value }
}

function login(login, password) {
    return axios
            .post(API_URL + '/login', {
                login: login,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            //.then(handleResponse)
            .then(response => {
                if (response.status !== 200) {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        AuthService.logout();
                        return response;
                    }
                    const data = response.data && JSON.parse(response.data);
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                localStorage.setItem('token', JSON.stringify(response.headers.authorization));
                currentTokenSubject.next(response.headers.authorization);
                return response.headers.authorization;
            }, (error) => {
                return Promise.reject(error);
            })
}

function register(login, password, firstName, lastName) {
    return axios
            .post(API_URL + '/user/register', {
                login: login,
                password: password,
                firstName: firstName,
                lastName: lastName
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        AuthService.logout();
                        return Promise.reject(response.status + " " + response.message);
                    }
                    const data = response.data && JSON.parse(response.data);
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return Promise.resolve("success")
            }, (error) => {
                return Promise.reject(error);
            })
}

function changePassword(login, password) {
    return axios
            .post(API_URL + '/user/changePassword', {
                login: login,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        AuthService.logout();
                        return Promise.reject(response.status + " " + response.message);
                    }
                    const data = response.data && JSON.parse(response.data);
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return response
            }, (error) => {
                return Promise.reject(error);
            })
}

function logout() {
    localStorage.removeItem('token');
    currentTokenSubject.next(null);
}

export default AuthService;