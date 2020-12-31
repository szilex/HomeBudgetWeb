import axios from 'axios';
import AuthService from './AuthService'

const API_URL = "http://localhost:8080";

export const StrategyService = {
    getCurrentStrategies,
    getArchiveStrategies,
    postStrategy,
    getStrategyCategories,
    deleteStrategy
}

function getCurrentStrategies() {
    return axios
            .get(API_URL + '/strategy', {
                headers: {
                    'Authorization': AuthService.currentTokenValue
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        AuthService.logout();
                        return Promise.reject(response);
                    }
                    const data = response.data && JSON.parse(response.data);
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return response.data;
            }, (error) => {
                return Promise.reject(error);
            })
}

function getArchiveStrategies() {
    return axios
            .get(API_URL + '/strategy/archive', {
                headers: {
                    'Authorization': AuthService.currentTokenValue
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        AuthService.logout();
                        return Promise.reject(response);
                    }
                    const data = response.data && JSON.parse(response.data);
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return response.data;
            }, (error) => {
                return Promise.reject(error);
            })
}

function postStrategy(strategy) {
    return axios
            .post(API_URL + '/strategy', {
                name: strategy.name,
                password: strategy.description,
                category: strategy.category,
                goal: strategy.goal,
                startDate: strategy.startDate,
                months: strategy.months
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AuthService.currentTokenValue
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

function getStrategyCategories() {
    return axios
    .get(API_URL + '/strategy/categories', {
        headers: {
            'Authorization': AuthService.currentTokenValue
        }
    })
    .then(response => {
        if (response.status !== 200) {
            if ([401, 403].indexOf(response.status) !== -1) {
                AuthService.logout();
                return Promise.reject(response);
            }
            const data = response.data && JSON.parse(response.data);
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return response.data;
    }, (error) => {
        return Promise.reject(error);
    })
}

function deleteStrategy(id) {
    return axios
            .delete(API_URL + '/strategy?id=' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AuthService.currentTokenValue
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

export default StrategyService;