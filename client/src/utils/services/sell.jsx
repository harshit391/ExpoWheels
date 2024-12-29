export const sellCar = async (data) => {
    try {
        const request = await fetch(`${API_URL_EWS}/api/sales/create`, {
            method: "POST",
            headers: {
                Authorization: `${localStorage.getItem("eWauthToken")}`,
            },
            body: data,
        });

        const response = await request.json();

        if (response.ok) {
            return response;
        }
    } catch (err) {
        console.error(err);
    }
};
