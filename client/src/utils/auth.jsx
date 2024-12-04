import { API_URL_EWS } from "./constants";

export const createUser = async (details) => {
    if (
        !details.name ||
        !details.email ||
        !details.password ||
        !details.confirmPassword ||
        !details.userType
    ) {
        throw Error("Please fill in all fields");
    }

    if (details.password !== details.confirmPassword) {
        throw Error("Passwords do not match");
    }

    setTimeout(() => {}, 2000);

    const response = await fetch(`${API_URL_EWS}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });

    const data = await response.json();

    if (data.error) {
        throw Error(data.error);
    }

    return { user: "Found" };
};

export const signUser = async (details) => {
    if (!details.email || !details.password) {
        throw Error("Please fill in all fields");
    }

    setTimeout(() => {}, 2000);

    const response = await fetch(`${API_URL_EWS}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });

    const data = await response.json();

    if (data.error) {
        throw Error(data.error);
    }

    return { user: "Found" };
};
