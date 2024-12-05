import { API_URL_EWS } from "./constants";

export const createUser = async (details) => {
    if (
        !details.name ||
        !details.email ||
        !details.password ||
        !details.confirmPassword ||
        !details.role
    ) {
        throw Error("Please fill in all fields");
    }

    if (details.password !== details.confirmPassword) {
        throw Error("Passwords do not match");
    }

    const response = await fetch(`${API_URL_EWS}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });

    const data = await response.json();

    localStorage.setItem("eWauthToken", data.token);

    if (data.error) {
        throw Error(data.error);
    }

    return { message: "User Created Successfully" };
};

export const signUser = async (details) => {
    if (!details.email || !details.password) {
        throw Error("Please fill in all fields");
    }

    const response = await fetch(`${API_URL_EWS}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });

    const data = await response.json();

    localStorage.setItem("eWauthToken", data.token);

    if (data.error) {
        throw Error(data.error);
    }

    return { message: "User Login Successfull" };
};

export const verifyToken = async (token) => {
    const response = await fetch(`${API_URL_EWS}/auth/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();

    console.log(data);

    if (data.error) {
        throw Error(data.error);
    }

    return { ok: "Valid Token" };
};
