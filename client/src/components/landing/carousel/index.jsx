import Slides from "./slides";

const Carousel = () => {
    const carData = [
        {
            id: 1,
            name: "Lamborghini Urus VII",
            price: 20000,
            image: "/Sample/Car1.png",
            deadline: 1733820121000,
        },
        {
            id: 2,
            name: "Car 2",
            price: 30000,
            image: "/Sample/Car2.png",
            deadline: 1733820121000,
        },
        {
            id: 3,
            name: "Car 3",
            price: 40000,
            image: "/Sample/Car1.png",
            deadline: 1733820121000,
        },
    ];

    return (
        <div className="flex flex-col min-h-[60dvh] justify-center w-full bg-gradient-to-r from-black via-[#222222] to-[#000000]">
            <Slides slides={carData} />
        </div>
    );
};

export default Carousel;
