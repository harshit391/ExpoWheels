import { API_URL_EWS } from "../constants";

export const editCar = async (data, id) => {
    try {
        const request = await fetch(`${API_URL_EWS}/api/cars/edit/${id}`, {
            method: "PUT",
            body: data,
        });

        const response = await request.json();

        return { ...response, ok: request.ok };
    } catch (err) {
        console.error(err);
    }
};
