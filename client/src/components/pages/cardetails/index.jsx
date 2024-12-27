import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL_EWS } from "../../../utils/constants";

const CarDetails = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`${API_URL_EWS}/api/cars/get/${id}`);
            const data = await response.json();
            setCarData(data.data);
        };

        fetchCarData();
    }, [id]);

    return (
        <div>
            {carData ? (
                <div className="p-4 flex flex-col gap-4">
                    <h1
                        style={{
                            fontFamily: "SuperBrigadeTitle",
                            letterSpacing: "-0.2rem",
                        }}
                        className="text-2xl md:text-5xl text-center py-8 col-span-1 md:col-span-3 uppercase"
                    >
                        {carData.brand} {carData.model}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <img
                                src={`/cars/${carData.image}`}
                                alt={carData.brand}
                                className="w-full"
                            />
                        </div>
                        <div
                            className="flex flex-col gap-4 justify-center"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            <div>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Price:</strong> {carData.price}
                                </p>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Year:</strong> {carData.year}
                                </p>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Fuel Type:</strong>{" "}
                                    {carData.fuelType}
                                </p>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Mileage:</strong> {carData.mileage}{" "}
                                    km/l
                                </p>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Transmission:</strong>{" "}
                                    {carData.transmission}
                                </p>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Location:</strong>{" "}
                                    {`${carData.location.city}, ${carData.location.state}, ${carData.location.country} - ${carData.location.zipCode}`}
                                </p>
                                <p className="text-lg md:text-xl lg:text-3xl">
                                    <strong>Date Listed:</strong>{" "}
                                    {new Date(
                                        carData.dateListed
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            {/* Buy and Rent Now Buttons */}
                            <div className="flex gap-4">
                                {carData.isAvailableForSale ? (
                                    <button className="bg-green-500 text-white p-2 rounded-md">
                                        Buy Now
                                    </button>
                                ): (
                                    <button className="bg-gray-500 hover:cursor-not-allowed text-white p-2 rounded-md">
                                        Not Available for Sale
                                    </button>
                                )}
                                {carData.isAvailableForRent ? (
                                    <button className="bg-blue-500 text-white p-2 rounded-md">
                                        Rent Now
                                    </button>
                                ) : (
                                    <button className="bg-gray-500 hover:cursor-not-allowed text-white p-2 rounded-md">
                                        Not Available for Rent
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default CarDetails;
