import axios from 'axios';
import { toast } from 'react-toastify';

const SERVER_BASE_URL = `http://localhost:4000/`;

const GuestApi = axios.create({
    baseURL: SERVER_BASE_URL
});

let accessToken = null;
if(localStorage.getItem('logged_user') != null){
    const userLocalStorage = JSON.parse(localStorage.getItem('logged_user'));
    const { access_token } = userLocalStorage.token;
    accessToken = access_token;
}

const AuthApi = axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
        Authorization: `bearer ${accessToken}`
    }
});

AuthApi.interceptors.response.use(response => response, error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
        toast.warning(`Your session is expired..! Please Login Again`);
    }

    return Promise.reject(error);
});

export { GuestApi, AuthApi, SERVER_BASE_URL };
