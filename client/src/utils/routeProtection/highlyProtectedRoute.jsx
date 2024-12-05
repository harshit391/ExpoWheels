import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import { useEffect, useState } from "react";

const HighlyProtectedRoute = ({ children }) => {
    const { user, admin } = useAuth();

    const navigate = useNavigate();

    const [userLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(() => {
        if (user && admin) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [user, admin]);

    useEffect(() => {
        if (userLoggedIn !== null && !userLoggedIn) {
            navigate("/");
        }
    }, [userLoggedIn, navigate]);

    if (userLoggedIn === null) {
        return null;
    }

    if (userLoggedIn) {
        return children;
    }

    return null;
};

export default HighlyProtectedRoute;
