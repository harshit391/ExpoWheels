import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const carData = [
    {
        id: 1,
        name: "Car 1",
        price: 20000,
        image: "https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
        id: 2,
        name: "Car 2",
        price: 30000,
        image: "https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
        id: 3,
        name: "Car 3",
        price: 40000,
        image: "https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
        id: 4,
        name: "Car 3",
        price: 40000,
        image: "https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
        id: 5,
        name: "Car 3",
        price: 40000,
        image: "https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
];

const App = () => {
    const animate = useAnimationControls();
    const cardAnimate = useAnimationControls();

    const [onSale, setOnSale] = useState(null);

    useEffect(() => {
        setOnSale(carData);
    });

    useEffect(() => {
        animate
            .start({
                opacity: 1,
                transition: {
                    delay: 0.25,
                    duration: 0.5,
                },
            })
            .then(() => {
                animate.start({
                    y: 0,
                    transition: {
                        delay: 0.375,
                        duration: 0.5,
                    },
                });
            })
            .then(() => {
                cardAnimate.start({
                    opacity: 1,
                    transition: {
                        delay: 0.5,
                        duration: 1,
                    },
                });
            });
    }, [animate, cardAnimate]);

    return (
        <div
            style={{ fontFamily: "Poppins" }} // 25f1d3
            className="flex flex-col p-4 gap-4 min-h-screen bg-gradient-to-r from-[#00000a] to-[#00041a]"
        >
            <motion.div
                initial={{ opacity: 0, y: 250 }}
                animate={animate}
                className="flex flex-col gap-1 max-h-max p-4"
            >
                <h1 className="text-8xl text-left ml-64 font-bold text-white uppercase tracking-tight">
                    Expo Wheels
                </h1>
                <p className="text-2xl text-right mr-96 text-white tracking-wide">
                    Drive Your Dream, Your Way
                </p>
            </motion.div>

            {onSale != null && (
                <div
                    className={`grid grid-cols-3 gap-4 justify-items-center p-4`}
                >
                    {onSale.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0 }}
                            animate={cardAnimate}
                            className="w-96 h-96 flex flex-col justify-around bg-[#caf0f8] p-4 rounded-md"
                        >
                            <h1 className="text-center font-bold text-3xl text-black">
                                {car.name}
                            </h1>
                            <img src={car.image} alt="Car 1" />
                            <p className="text-center font-semibold text-black text-xl">
                                {`Price :- ${car.price}`}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
