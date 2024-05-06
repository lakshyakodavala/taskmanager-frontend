// Import necessary dependencies from React
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Define ProtectedRoute functional component with element prop
const ProtectedRoute = ({ element: Component }) => {
    // Define state variable to track authentication status
    const [authenticated, setAuthenticated] = useState(false);

    // Effect hook to check authentication status on component mount
    useEffect(() => {
        // Function to check authentication status
        const checkAuthentication = async () => {
            // Get email from localStorage
            const email = await localStorage.getItem("email");
            // Update authenticated state based on email existence
            setAuthenticated(email !== null && email !== undefined);
        };
        // Call checkAuthentication function
        checkAuthentication();
    }, []);

    // Render component conditionally based on authentication status
    return (
        <>
            {/* If authenticated, render the component, else navigate to /tasks */}
            {authenticated ? <Component /> : <Navigate to="/tasks" replace />}
        </>
    );
};

// Export ProtectedRoute component as default
export default ProtectedRoute;

