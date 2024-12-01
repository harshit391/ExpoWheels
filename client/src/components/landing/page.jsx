import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Navbar from "./navbar";
import Carousel from "./carousel";

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

    const [show, setShow] = useState(true);
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
                return animate.start({
                    y: 0,
                    opacity: 0,
                    transition: {
                        delay: 0.375,
                        duration: 0.5,
                    },
                });
            })
            .then(() => {
                setShow(false);
            })
            .then(() => {
                cardAnimate.start({
                    opacity: 1,
                    transition: {
                        duration: 1,
                    },
                });
            });
    }, [animate, cardAnimate]);

    return (
        <div
            style={{ fontFamily: "Poppins" }} // 25f1d3
            className="flex flex-col gap-4 min-h-screen"
        >
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        delay: 1,
                        duration: 1,
                    },
                }}
            >
                <Navbar />
            </motion.div>

            {show && (
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
            )}

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={cardAnimate}
            >
                <Carousel data={onSale} />
            </motion.div>
        </div>
    );
};

export default Title;
