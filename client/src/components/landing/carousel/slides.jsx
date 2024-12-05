import { useEffect, useRef, useState } from "react";

import "./slides.css";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

const Slides = ({ slides }) => {
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

    const mySwiper = useRef(null);

    useEffect(() => {
        const id = setInterval(() => {
            if (mySwiper.current) {
                mySwiper.current.slideNext();
            }
        }, 5000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex flex-col justify-between overflow-x-hidden">
            <div className="flex items-center">
                <Swiper
                    onSwiper={(s) => (mySwiper.current = s)}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    speed={1000}
                    loop={true}
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                    className="swiper-container flex"
                >
                    {slides.map((s, i) => (
                        <SwiperSlide key={s.name}>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
                                <div className="w-2/5 h-64 flex justify-center items-center">
                                    <img
                                        src={s.image}
                                        alt={s.name}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 flex justify-center gap-4 p-6">
                                    <div className="flex flex-col gap-4">
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
                                                fontFamily:
                                                    "SuperBrigadeCondensed",
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
                                                        letterSpacing:
                                                            "0.15rem",
                                                    }}
                                                >
                                                    Time Left:
                                                </h5>
                                                <h5
                                                    className="text-white text-xl md:text-2xl font-semibold"
                                                    style={{
                                                        fontFamily:
                                                            "SuperBrigadeCondensed",
                                                        letterSpacing:
                                                            "0.15rem",
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
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Slides;
