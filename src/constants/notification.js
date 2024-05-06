// Import notification component from Ant Design
import { notification } from 'antd';

// Define Notification function with parameters for type, message, and description
export const Notification = (type, message, description) => {
    try {
        // Array of allowed message types
        const messageTypes = ['success', 'info', 'warning', 'error'];
        // Check if the provided message type is valid
        if (messageTypes.includes(type)) {
            // Check if message is provided
            if (message) {
                // Configuration object for the notification
                const config = {
                    message, // Set the message for the notification
                    duration: 0, // Set the duration of the notification (0 for indefinite)
                };
                // Check if description is provided
                if (description) {
                    config.description = description; // Set the description for the notification
                }
                // Send the notification using the appropriate type
                notification[type](config);
            } else {
                throw new Error('Message cannot be a falsy value.'); // Throw an error if message is not provided
            }
        } else {
            throw new Error(
                "Wrong message type. Message type should be any of the below types - 'success', 'info', 'warning', 'error'"
            ); // Throw an error if an invalid message type is provided
        }
    } catch (err) {
        console.log('Error - Error on creating notification', err); // Log any errors that occur during notification creation
    }
};

