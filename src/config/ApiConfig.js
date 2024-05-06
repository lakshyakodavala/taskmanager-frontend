// Import the axios library for making HTTP requests
import axios from 'axios';
// Import the configuration settings from the Config file
import config from './Config';

// Create an instance of axios with base URL and default headers
const api = axios.create({
    baseURL: config.baseApiUrl, // Set the base URL for the API requests
    headers: {
        'Content-Type': 'application/json', // Set the default content type for requests
    },
});

// Add response interceptor to handle successful responses and errors
api.interceptors.response.use(
    (response) => {
        // Return the response for successful requests
        return response;
    },
    (error) => {
        // Return a rejected promise for errors
        return Promise.reject(error);
    }
);

// Export the configured axios instance as default
export default api;
