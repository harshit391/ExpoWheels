import { useEffect, useState } from "react";
import { useAuth } from "../../context/context";

const UnProtectedRoute = ({ children }) => {
    const { user, admin } = useAuth();

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        if (user || admin) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [user, admin]);

    if (!userLoggedIn) {
        return children;
    } else {
        navigate("/");
    }
};

export default UnProtectedRoute;
