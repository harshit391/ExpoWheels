import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../utils/auth";
import { SECRET_KEY } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("eWauthToken");

                if (!token) {
                    setUser(null);
                    setAdmin(null);
                    return;
                }

                if (token) {
                    const response = await verifyToken(token);

                    if (response.ok) {
                        setUser(response);

                        if (response.role === SECRET_KEY) {
                            setAdmin(response);
                        } else {
                            setAdmin(null);
                        }
                    } else {
                        setUser(null);
                    }
                }
                else
                {
                    setUser(null);
                    setAdmin(null);
                }
            } catch (err) {
                setUser(null);
                setAdmin(null);
            }
        };

        checkUser();
    }, [user, admin]);

    return (
        <AuthContext.Provider value={{ user, admin, setUser, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
