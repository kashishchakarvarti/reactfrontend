import { authenticationService } from '@/_services';

export function handleResponse(response) {
    return response.text().then(text =>  {
        const data = (isJson(text))? JSON.parse(text) : 'something went wrong'
        if (!response.ok) {

            if ([401, 403].indexOf(response.status) !== -1) {

                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || 'validation error';
            return Promise.reject(error);
        }
        return data;
    });
}

const  isJson = (str) =>{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}