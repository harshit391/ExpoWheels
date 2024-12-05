import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import { useEffect, useState } from "react";

const HighlyProtectedRoute = ({ children }) => {
    const { user, admin } = useAuth();

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user && admin) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
            navigate("/login");
        }
    }, [user, admin]);

    if (userLoggedIn) {
        return children;
    } else {
        navigate("/");
    }
};

export default HighlyProtectedRoute;
