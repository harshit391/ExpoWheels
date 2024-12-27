import { API_URL_EWS } from "./constants";

export const deleteSale = async (id) => {
    try {
        const response = await fetch(`${API_URL_EWS}/api/sales/remove/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            return { message: "Sale Deleted Successfully" };
        }

        throw Error("Failed to delete sale");
    } catch (error) {
        return { error: error.message };
    }
};
