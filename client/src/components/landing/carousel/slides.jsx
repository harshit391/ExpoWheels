import { useEffect, useState } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

const Slides = ({ slides }) => {
    const [current, setCurrent] = useState(0);

    const [timeLeft, setTimeLeft] = useState([]);

    useEffect(() => {
        const calcTimeLeft = (deadline) => {
            const curr = new Date();
            const end = new Date(deadline);

            const diff = end - curr;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                return {
                    days,
                    hours,
                    minutes,
                    seconds,
                };
            } else {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                };
            }
        };

        const updateTimers = () => {
            const newTimeLeft = slides.map((slide) =>
                calcTimeLeft(slide.deadline)
            );
            setTimeLeft(newTimeLeft);
        };

        updateTimers();
        const timerId = setInterval(updateTimers, 1000);

        return () => clearInterval(timerId); // Cleanup interval on unmount
    }, [slides]);

    const prevSlide = () => {
        if (current == 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    const nextSlide = () => {
        if (current == slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div className="flex flex-col justify-between overflow-x-hidden">
            <div className="flex">
                <button
                    onClick={prevSlide}
                    className="hidden sm:flex justify-center items-center text-lg md:text-4xl text-white w-[10%] z-40"
                >
                    <BsFillArrowLeftCircleFill />
                </button>
                <div className="w-full md:w-4/5 overflow-hidden">
                    <div
                        className="flex"
                        style={{
                            transform: `translateX(${-current * 100}%)`,
                            transition: "transform 500ms ease-in",
                        }}
                    >
                        {slides.map((s, i) => (
                            <div
                                key={s.name}
                                className="w-full flex flex-col md:flex-row items-center justify-center flex-shrink-0 gap-4 p-4"
                            >
                                <div className="w-full md:w-1/2">
                                    <img
                                        src={s.image}
                                        alt={s.name}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 flex flex-col gap-4">
                                    <h1
                                        className="text-white text-3xl md:text-4xl font-bold"
                                        style={{
                                            fontFamily: "SuperBrigadeTitle",
                                        }}
                                    >
                                        {s.name}
                                    </h1>
                                    <h3
                                        className="text-white text-xl md:text-2xl font-semibold"
                                        style={{
                                            fontFamily: "SuperBrigadeCondensed",
                                            letterSpacing: "0.1rem",
                                        }}
                                    >
                                        Price: {s.price}
                                    </h3>
                                    {timeLeft[i] && (
                                        <div>
                                            <h5
                                                className="text-white text-md md:text-lg font-semibold"
                                                style={{
                                                    fontFamily:
                                                        "SuperBrigadeCondensed",
                                                    letterSpacing: "0.15rem",
                                                }}
                                            >
                                                Time Left:
                                            </h5>
                                            <h5
                                                className="text-white text-xl md:text-2xl font-semibold"
                                                style={{
                                                    fontFamily:
                                                        "SuperBrigadeCondensed",
                                                    letterSpacing: "0.15rem",
                                                }}
                                            >
                                                {`
                                                    ${timeLeft[i].days}d 
                                                    ${timeLeft[i].hours}h 
                                                    ${timeLeft[i].minutes}m 
                                                    ${timeLeft[i].seconds}s
                                                `}
                                            </h5>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    className="hidden sm:flex justify-center items-center text-lg md:text-4xl text-white w-[10%] z-40"
                >
                    <BsFillArrowRightCircleFill />
                </button>
            </div>
            <div className="flex gap-2 justify-center items-center mt-4">
                {slides.map((s, i) => (
                    <div
                        key={s.name}
                        onClick={() => setCurrent(i)}
                        className={`cursor-pointer rounded-full ${
                            i === current
                                ? "w-6 h-6 bg-white"
                                : "w-4 h-4 bg-gray-500"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slides;
