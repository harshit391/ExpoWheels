import { useNavigate } from "react-router-dom";
import { verifyToken } from "../auth";
import { useState, useEffect } from "react";
import { SECRET_KEY } from "../constants";

const HighlyProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("eWauthToken");

                if (token) {
                    const res = await verifyToken(token);

                    if (res && res.ok) {
                        setIsAuthenticated(true);
                        setIsAdmin(false);

                        if (res.role === SECRET_KEY) {
                            setIsAuthenticated(true);
                            setIsAdmin(true);
                        }
                    } else {
                        setIsAdmin(false);
                        setIsAuthenticated(false);
                    }
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

    if (isAuthenticated && isAdmin) {
        return children;
    } else {
        navigate("/login");
    }
};

export default HighlyProtectedRoute;
