import axios from 'axios';
import AuthService from './AuthService'

const API_URL = "http://localhost:8080";

export const RegularExpenseService = {
    getCurrentRegularExpenses,
    getArchiveRegularExpenses,
    postRegularExpense,
    getRegularExpenseCategories,
    deleteRegularExpense
}

function getCurrentRegularExpenses() {
    return axios
            .get(API_URL + '/expense', {
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

function getArchiveRegularExpenses() {
    return axios
            .get(API_URL + '/expense/archive', {
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

function postRegularExpense(expense) {
    return axios
            .post(API_URL + '/expense', {
                name: expense.name,
                category: expense.category,
                amount: expense.amount,
                startDate: expense.startDate,
                months: expense.months
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

function getRegularExpenseCategories() {
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

function deleteRegularExpense(id) {
    return axios
            .delete(API_URL + '/expense?id=' + id, {
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

export default RegularExpenseService;