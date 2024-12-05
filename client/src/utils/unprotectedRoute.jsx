import { Navigate } from "react-router-dom";
import { verifyToken } from "./auth";
import { useState, useEffect } from "react";

const UnProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("eWauthToken");

                if (token) {
                    const res = await verifyToken(token);
                    setIsAuthenticated(res.ok); // Update based on your `verifyToken` implementation
                }
            } catch (error) {
                console.error("Error verifying token:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        // Show a loading spinner or placeholder while checking authentication
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <Navigate to="/" replace /> // Redirect if already logged in
    ) : (
        children // Render the child components if not authenticated
    );
};

export default UnProtectedRoute;
