// Define configuration object with base API URL fetched from environment variables
const config = {
    baseApiUrl: process.env['REACT_APP_BACKEND_URL'], // Set the base API URL using environment variables
}

// Export the configuration object as default
export default config;
