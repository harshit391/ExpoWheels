import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const carData = [
    {
        id: 1,
        name: "Car 1",
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

const containerStyle = {
    background: "rgba(0, 0, 0, 0.2)", // Blue tint
    backdropFilter: "blur(15px)", // Glass blur effect
    WebkitBackdropFilter: "blur(15px)", // Safari compatibility
    border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
    borderRadius: "15px", // Rounded corners
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Depth shadow
    padding: "2D0px",
    width: "300px",
    textAlign: "center",
    color: "#fff", // Text color
    margin: "50px auto", // Center alignment
};

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
            className="flex flex-col p-4 gap-4 min-h-screen bg-gradient-to-r from-[#00000a] via-[#00013a] to-[#00041a]"
        >
            <motion.div
                initial={{ opacity: 0, y: 250 }}
                animate={animate}
                className="flex flex-col gap-1 max-h-max p-4"
            >
                <div className="grid grid-cols-4">
                    <h1 className="text-8xl text-center col-span-3 font-bold text-white uppercase tracking-tight">
                        Expo Wheels
                    </h1>
                    <div></div>
                </div>
                <div className="grid grid-cols-4">
                    <div></div>
                    <p className="text-2xl col-span-3 text-center text-white tracking-wide">
                        Drive Your Dream, Your Way
                    </p>
                </div>
            </motion.div>

            {onSale != null && (
                <div className="grid grid-cols-3 gap-6 justify-items-center p-6">
                    {onSale.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0 }}
                            animate={cardAnimate}
                            className="w-96 h-96 flex flex-col justify-around backdrop-blur-md bg-white/20 border-2 border-solid border-white p-4 rounded-md"
                        >
                            <h1 className="text-center font-bold text-3xl text-white tracking-wider">
                                {car.name}
                            </h1>
                            <div className="flex justify-center items-center">
                                <img
                                    style={{
                                        filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 1))",
                                    }}
                                    src={car.image}
                                    alt={car.name}
                                    className="rounded-md w-80 h-40 object-cover"
                                />
                            </div>
                            <p className="text-center font-semibold text-white text-xl">
                                {`Price: $${car.price}`}
                            </p>
                            <button className="bg-[#0077b6] text-white font-medium text-lg px-6 py-2 rounded-md hover:bg-[#023e8a] transition-colors">
                                Buy Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
