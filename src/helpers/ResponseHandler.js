import { AuthService } from '../services/AuthService';

export function handleResponse(response) {
       
    if (response.status !== 200) {
        if ([401, 403].indexOf(response.status) !== -1) {
            AuthService.logout();
            return response;
        }
        const data = response.data && JSON.parse(response.data);
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;

}