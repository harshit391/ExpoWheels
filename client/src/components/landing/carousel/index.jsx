import { useEffect, useState } from "react";
import Slides from "./slides";
import { API_URL_EWS } from "../../../utils/constants";

const Carousel = () => {
    const [salesData, setSalesData] = useState([]);

    // useEffect(() => {
    //     const fetchSalesData = async () => {
    //         try {
    //             const response = await fetch(`${API_URL_EWS}/api/sales`);
    //             const data = await response.json();
    //             setSalesData(data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };

    //     fetchSalesData();
    // }, []);
    const carData = [
        {
            id: 1,
            name: "Lamborghini Aventador VI",
            price: 20000,
            image: "/cars/pic20.jpg",
            deadline: 1733820121000,
        },
        {
            id: 2,
            name: "Lamborghini Aventador VII",
            price: 30000,
            image: "/cars/pic19.jpg",
            deadline: 1733820121000,
        },
        {
            id: 3,
            name: "Lamborghini Aventador VIII",
            price: 40000,
            image: "/cars/pic16.jpg",
            deadline: 1733820121000,
        },
    ];

    return (
        <div className="flex flex-col min-h-[50vh] justify-center w-full bg-gradient-to-r from-black via-[#222222] to-[#000000]">
            <Slides slides={carData} />
        </div>
    );
};

export default Carousel;
