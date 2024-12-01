import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const carData = [
    {
        id: 1,
        name: "Lamborghini Urus VII",
        price: 20000,
        image: "/Sample/Car1.png",
    },
    {
        id: 2,
        name: "Car 2",
        price: 30000,
        image: "/Sample/Car2.png",
    },
    {
        id: 3,
        name: "Car 3",
        price: 40000,
        image: "/Sample/Car1.png",
    },
];

const Title = () => {
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
            className="flex flex-col p-4 gap-4 min-h-screen"
        >
            <motion.div
                initial={{ opacity: 0, y: 250 }}
                animate={animate}
                className="flex flex-col gap-1 max-h-max p-4"
            >
                <div className="grid grid-cols-4">
                    <h1
                        style={{
                            fontFamily: "SuperBrigadeTitle",
                            letterSpacing: "-0.5rem",
                        }}
                        className="text-5xl md:text-7xl text-center col-span-1 md:col-span-3 uppercase"
                    >
                        Expo Wheels
                    </h1>
                    <div></div>
                </div>
                <div className="grid grid-cols-4">
                    <div></div>
                    <p
                        style={{
                            fontFamily: "SuperBrigadeCondensed",
                            letterSpacing: "0.5rem",
                        }}
                        className="text-2xl col-span-3  text-center tracking-wide"
                    >
                        Drive Your Dream, Your Way
                    </p>
                </div>
            </motion.div>

            {onSale != null && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center p-4 rounded-md">
                    {onSale.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0 }}
                            animate={cardAnimate}
                            className="w-full h-full flex flex-col gap-4 justify-around backdrop-blur-md bg-white/20 border-2 border-solid border-gray-600 p-4 rounded-md"
                        >
                            <div className="flex justify-between">
                                <h1
                                    style={{ fontFamily: "SuperBrigade" }}
                                    className="font-bold text-left  text-2xl"
                                >
                                    {car.name}
                                </h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <img
                                    style={{
                                        filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 1))",
                                    }}
                                    src={car.image}
                                    alt={car.name}
                                    className="rounded-md w-full object-cover"
                                />
                            </div>
                            <p className="text-center font-semibold text-xl">
                                {`Price: $${car.price}`}
                            </p>
                            <div className="flex gap-2 justify-center">
                                <button className="bg-[#caf0f8] w-full font-medium text-lg px-6 py-2 rounded-md hover:bg-[#48cae4] transition-colors">
                                    Buy Now
                                </button>
                                <button className="bg-[#caf0f8] w-full font-medium text-lg px-6 py-2 rounded-md hover:bg-[#48cae4] transition-colors">
                                    Show Info
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Title;
