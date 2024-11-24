import React, { useEffect } from "react";
import {motion, useAnimationControls} from "framer-motion";

const App = () => {

    const animate = useAnimationControls();
    const cardAnimate = useAnimationControls();

    useEffect(() => {
        animate.start({
            opacity: 1,
            transition: {
                delay: 0.25,
                duration: 0.5
            }
        }).then(() => {
            animate.start({
                y: 0,
                transition: {
                    delay: 0.25,
                    duration: 0.5
                }
            })
        }).then(() => {
            cardAnimate.start({
                opacity: 1,
                transition: {
                    delay: 0.5,
                    duration: 1
                }
            })
        })
    }, [animate, cardAnimate]);

    return (
        <div
            style={{ fontFamily: "Poppins" }}
            className="flex flex-col justify-around p-4 min-h-screen bg-gradient-to-r from-[#25f1d3] to-[#00045a]"
        >
            <motion.div
            initial={{ opacity: 0, y: 250 }}
            animate={animate}
            className="flex flex-col gap-1 max-h-max p-4">
                <h1 className="text-8xl text-center font-bold text-white uppercase tracking-tight">Expo Wheels</h1>
                <p className="text-2xl text-center text-white tracking-wide">Drive Your Dream, Your Way</p>
            </motion.div>

            <div className="grid grid-cols-3 justify-items-center p-4">
                <motion.div
                initial={{ opacity: 0 }}
                animate={cardAnimate}
                className="w-96 h-96 flex flex-col justify-around bg-[#083674] p-4 rounded-md">
                    <h1 className="text-center font-bold text-3xl text-white">Car 1</h1>
                    <img src="https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Car 1" />
                    <p className="text-center font-semibold text-white text-xl">Price :- 20000</p>
                </motion.div>
                <motion.div
                initial={{ opacity: 0 }}
                animate={cardAnimate}
                className="w-96 h-96 flex flex-col justify-around bg-[#083674] p-4 rounded-md">
                    <h1 className="text-center font-bold text-3xl text-white">Car 1</h1>
                    <img src="https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Car 1" />
                    <p className="text-center font-semibold text-white text-xl">Price :- 20000</p>
                </motion.div>
                <motion.div
                initial={{ opacity: 0 }}
                animate={cardAnimate}
                className="w-96 h-96 flex flex-col justify-around bg-[#083674] p-4 rounded-md">
                    <h1 className="text-center font-bold text-3xl text-white">Car 1</h1>
                    <img src="https://th.bing.com/th/id/OIP.bacWE2DlJQTSbG6kvNrzegHaEK?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Car 1" />
                    <p className="text-center font-semibold text-white text-xl">Price :- 20000</p>
                </motion.div>
            </div>
        </div>
    );
};

export default App;
