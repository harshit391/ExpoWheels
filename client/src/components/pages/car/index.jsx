const Car = ({ car }) => {
    const formatDate = (date) => {
        // 2024-12-26T15:35:14.059Z => 26-December-2024

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

        const formattedDate = `${day}-${months[month - 1]}-${year}`;

        return formattedDate;
    };

    return (
        <div className="flex flex-col gap-4 border border-solid border-black p-4">
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
            <div className="flex flex-col items-center">
                <p
                    style={{
                        fontFamily: "Poppins",
                    }}
                    className="italic w-full text-center"
                >
                    {car.description}
                </p>
                <div className="flex flex-col w-full">
                    <div className="flex gap-4">
                        <div>
                            Price :- {car.price}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <p>{car.fuelType}</p>
                        <p>{car.mileage}</p>
                    </div>
                    <div className="flex gap-4">
                        <p>{car.transmission}</p>
                        <p>{formatDate(car.dateListed)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Car;
