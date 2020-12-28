import axios from 'axios';
import AuthService from './AuthService'

const API_URL = "http://localhost:8080";

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
                console.log(response)
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
                console.log(error)
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
                console.log(response)
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
                console.log(error)
                return Promise.reject(error);
            })
}

function postBudget(budget) {
    return axios
            .post(API_URL + '/budget', {
                income: budget.name,
                date: budget.category,
                customeExpenses: budget.amount,
                regularExpenses: budget.startDate,
                strategies: budget.months
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AuthService.currentTokenValue
                }
            })
            .then(response => {
                console.log(response)
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
        console.log(response)
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
        console.log(error)
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
                console.log(response)
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