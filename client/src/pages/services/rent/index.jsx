import { useEffect, useState } from "react";
import { API_URL_EWS } from "../../../utils/constants";
import Car from "../../../components/pages/car";

const Rent = () => {
    const [carsData, setCarsData] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`${API_URL_EWS}/api/cars/get`);

            const data = await response.json();

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
                    Rent a Car
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {carsData.map((car) => (
                        <Car key={car._id} car={car} buyOrRent={false} />
                    ))}
                </div>
                <div></div>
            </div>
        );
    }
};

export default Rent;
