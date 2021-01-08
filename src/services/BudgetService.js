import axios from 'axios';
import AuthService from './AuthService'

const API_URL = process.env.REACT_APP_SERVER_URL;

export const BudgetService = {
    getCurrentBudget,
    getArchiveBudgets,
    postBudget,
    getCustomExpenseCategories,
    deleteBudget
}

function getCurrentBudget() {
    return axios
            .get(API_URL + '/budget', {
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

function getArchiveBudgets() {
    return axios
            .get(API_URL + '/budget/archive', {
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

function postBudget(budget) {
    return axios
            .post(API_URL + '/budget', {
                income: budget.income,
                date: budget.date,
                customeExpenses: budget.customeExpenses,
                regularExpenses: budget.regularExpenses,
                strategies: budget.strategies
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

function getCustomExpenseCategories() {
    return axios
    .get(API_URL + '/expense/categories', {
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

function deleteBudget(id) {
    return axios
            .delete(API_URL + '/budget?id=' + id, {
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

export default BudgetService;