import axios from 'axios';
import config from './Config';

const api = axios.create({
    baseURL: config.baseApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});




api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;