import { Link } from "react-router-dom";

const Car = ({ car, buyOrRent }) => {
    const formatDate = (date) => {
        const dateObj = new Date(date);

        const day = dateObj.getDate();

        const month = dateObj.getMonth() + 1;

        const year = dateObj.getFullYear();

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const formattedDate = `${months[month - 1]} ${day}, ${year}`;

        return formattedDate;
    };

    return (
        <div className="flex flex-col gap-4 rounded-md p-4 shadow-2xl justify-between md:hover:scale-105 cursor-pointer transition">
            <div className="flex flex-col gap-4 w-full">
                <h1
                    className="text-lg md:text-2xl text-center py-4 col-span-1 md:col-span-3 uppercase"
                    style={{
                        fontFamily: "SuperBrigadeTitle",
                        letterSpacing: "-0.1rem",
                    }}
                >
                    {car.title}
                </h1>
                <img
                    src={`/cars/${car.image}`}
                    alt={car.title}
                    style={{
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    className="rounded-md"
                />
            </div>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex gap-2 items-center justify-between">
                    <p className="italic">{car.description}</p>
                    {buyOrRent &&
                        car.isAvailableForSale &&
                        car.onDiscountSale !== null && (
                            <div className="bg-blue-500 text-white font-semibold px-4 py-2 rounded text-center">
                                On Sale
                            </div>
                        )}
                    {!buyOrRent &&
                        car.isAvailableForRent &&
                        car.onDiscountSale !== null && (
                            <div className="bg-blue-500 text-white font-semibold px-4 py-2 rounded text-center">
                                On Sale
                            </div>
                        )}
                </div>
                <div
                    className="flex flex-col gap-2"
                    style={{ fontFamily: "Poppins" }}
                >
                    <div className="flex justify-between items-center">
                        <span className="text-green-600 text-3xl font-bold">
                            ${car.price}
                        </span>
                        <span className="text-2xl">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Mileage:</span>
                        <span>{car.mileage} km</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">Transmission:</span>
                        <span>{car.transmission}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">Date Listed:</span>
                        <span>{formatDate(car.dateListed)}</span>
                    </div>
                </div>
                {buyOrRent &&
                    (car.isAvailableForSale ? (
                        <Link
                            to={`/car/${car._id}`}
                            className="mt-6 flex flex-col gap-4"
                        >
                            <button className="w-full bg-green-700 text-white font-semibold py-2 rounded hover:bg-green-900 transition">
                                View Details
                            </button>
                        </Link>
                    ) : (
                        <div className="mt-6 flex flex-col gap-4">
                            <button className="w-full bg-gray-500 text-white font-semibold py-2 rounded hover:cursor-not-allowed transition">
                                Currently Not Available
                            </button>
                        </div>
                    ))}
                {!buyOrRent &&
                    (car.isAvailableForRent ? (
                        <Link
                            to={`/car/${car._id}`}
                            className="mt-6 flex flex-col gap-4"
                        >
                            <button className="w-full bg-green-700 text-white font-semibold py-2 rounded hover:bg-green-900 transition">
                                View Details
                            </button>
                        </Link>
                    ) : (
                        <div className="mt-6 flex flex-col gap-4">
                            <button className="w-full bg-gray-500 text-white font-semibold py-2 rounded hover:cursor-not-allowed transition">
                                Currently Not Available
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Car;
