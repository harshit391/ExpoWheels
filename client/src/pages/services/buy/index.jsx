import { useEffect, useState } from "react";
import { API_URL_EWS } from "../../../utils/constants";
import Car from "../../../components/pages/car";

const Buy = () => {
    const [carsData, setCarsData] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`${API_URL_EWS}/api/cars/get`);

            const data = await response.json();

            console.log(data.data);

            setCarsData(data.data);
        };

        fetchCarData();
    }, []);

    if (!carsData) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    {
        return (
            <div className="p-4 flex flex-col gap-4">
                <h1
                    style={{
                        fontFamily: "SuperBrigadeTitle",
                        letterSpacing: "-0.2rem",
                    }}
                    className="text-2xl md:text-5xl text-center py-8 col-span-1 md:col-span-3 uppercase"
                >
                    Buy a Car
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {carsData.map((car) => (
                        <Car key={car._id} car={car} />
                    ))}
                </div>
                <div></div>
            </div>
        );
    }
};

export default Buy;
