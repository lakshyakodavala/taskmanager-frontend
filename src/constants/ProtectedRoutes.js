import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const email = await localStorage.getItem("email");
            setAuthenticated(email !== null && email !== undefined);
        };
        checkAuthentication();
    }, []);

    return (
        <>
            {authenticated ? <Component /> : <Navigate to="/tasks" replace />}
        </>
    );
};

export default ProtectedRoute;
