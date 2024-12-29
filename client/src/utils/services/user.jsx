import { API_URL_EWS } from "../constants";

export const getUser = async (id) => {
    try {
        const response = await fetch(`${API_URL_EWS}/api/auth/${id}`, {
            method: "GET",
            headers: {
                Authorization: `${localStorage.getItem("eWauthToken")}`,
            },
        }).then((res) => res.json());

        console.log("Response", response);

        return {
            user: response.user,
            ok: true,
        };
    } catch (error) {
        return {
            message: "Error fetching user",
        };
    }
};
