import { useEffect, useState } from "react";
import { useAuth } from "../../context/context";
import { useNavigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
    const { user, admin } = useAuth();
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(() => {
        if (user || admin) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [user, admin]);

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/");
        }
    }, [userLoggedIn, navigate]);

    if (userLoggedIn === null) {
        return null;
    }

    if (!userLoggedIn) {
        return children;
    }

    return null;
};

export default UnProtectedRoute;
