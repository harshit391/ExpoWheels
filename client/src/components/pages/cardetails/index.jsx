import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL_EWS } from "../../../utils/constants";
import { deleteSale } from "../../../utils/sales";

const CarDetails = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`${API_URL_EWS}/api/cars/get/${id}`);
            const data = await response.json();
            setCarData(data.data);

            // Initialize the timer if the saleDate exists
            if (data.data.onDiscountSale?.saleDate) {
                const saleEndDate = new Date(
                    data.data.onDiscountSale.saleDate
                ).getTime();
                calculateTimeRemaining(saleEndDate);
                startTimer(saleEndDate);
            }
        };

        fetchCarData();

        // Clean up the timer when the component unmounts
        return () => clearInterval(timerId);
    }, [id]);

    let timerId;

    const calculateTimeRemaining = async (saleEndDate) => {
        const now = new Date().getTime();
        const difference = saleEndDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining(
                `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
            );
        } else {
            setTimeRemaining("Sale has ended");
            await deleteSale(carData.onDiscountSale._id);
        }
    };

    const startTimer = (saleEndDate) => {
        timerId = setInterval(() => calculateTimeRemaining(saleEndDate), 1000);
    };

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
                                alt={carData.title}
                                className="w-full"
                            />
                        </div>
                        <div
                            className="flex flex-col gap-4 justify-center"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {carData.onDiscountSale && (
                                <div className="flex gap-8 items-center">
                                    <div className="flex max-w-max bg-blue-500 text-white font-semibold px-4 py-2 rounded text-center">
                                        On Sale{" "}
                                        {
                                            carData.onDiscountSale
                                                .discountPercentage
                                        }
                                        {"% Off"}
                                    </div>
                                    <div>
                                        <p className="italic text-sm text-red-500 md:text-md lg:text-lg">
                                            Time Remaining :{" "}
                                            {timeRemaining || "Calculating..."}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div>
                                {carData.isAvailableForSale && (
                                    <div>
                                        <p className="text-lg md:text-xl lg:text-2xl">
                                            <strong>Price:</strong>{" "}
                                            {carData.onDiscountSale ? (
                                                <>
                                                    <span className="text-red-500 font-bold">
                                                        $
                                                        {(
                                                            carData.price *
                                                            (1 -
                                                                carData
                                                                    .onDiscountSale
                                                                    .discountPercentage /
                                                                    100)
                                                        ).toFixed(2)}
                                                    </span>{" "}
                                                    <span className="line-through text-gray-500">
                                                        $
                                                        {carData.price.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </>
                                            ) : (
                                                `$${carData.price.toFixed(2)}`
                                            )}
                                        </p>
                                    </div>
                                )}
                                {carData.isAvailableForRent && (
                                    <div>
                                        <p className="text-lg md:text-xl lg:text-2xl">
                                            <strong>Rent Price:</strong>{" "}
                                            {carData.onDiscountSale ? (
                                                <>
                                                    <span className="text-red-500 font-bold">
                                                        $
                                                        {(
                                                            carData.rentPrice *
                                                            (1 -
                                                                carData
                                                                    .onDiscountSale
                                                                    .discountPercentage /
                                                                    100)
                                                        ).toFixed(2)}
                                                    </span>{" "}
                                                    <span className="line-through text-gray-500">
                                                        $
                                                        {carData.rentPrice.toFixed(
                                                            2
                                                        )}
                                                    </span>{" "}
                                                </>
                                            ) : (
                                                `$${carData.rentPrice.toFixed(
                                                    2
                                                )}`
                                            )}
                                        </p>
                                    </div>
                                )}
                                <p className="text-lg md:text-xl lg:text-2xl">
                                    <strong>Year:</strong> {carData.year}
                                </p>
                                <p className="text-lg md:text-xl lg:text-2xl">
                                    <strong>Fuel Type:</strong>{" "}
                                    {carData.fuelType}
                                </p>
                                <p className="text-lg md:text-xl lg:text-2xl">
                                    <strong>Mileage:</strong> {carData.mileage}{" "}
                                    km/l
                                </p>
                                <p className="text-lg md:text-xl lg:text-2xl">
                                    <strong>Transmission:</strong>{" "}
                                    {carData.transmission}
                                </p>
                                <p className="text-lg md:text-xl lg:text-2xl">
                                    <strong>Location:</strong>{" "}
                                    {`${carData.location.city}, ${carData.location.state}, ${carData.location.country} - ${carData.location.zipCode}`}
                                </p>
                                <p className="text-lg md:text-xl lg:text-2xl">
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
                                ) : (
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
