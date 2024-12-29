import { API_URL_EWS } from "../constants";

export const sellCar = async (data) => {
    try {
        const request = await fetch(`${API_URL_EWS}/api/cars/add`, {
            method: "POST",
            body: data,
        });

        const response = await request.json();

        return { ...response, ok: request.ok };
    } catch (err) {
        console.error(err);
    }
};
