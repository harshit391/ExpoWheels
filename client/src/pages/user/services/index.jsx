import Card from "../../../components/landing/main/card";


const User = () => {
    const cards = [
        {
            title: "Cars Bought",
            description: "All the cars you have bought",
            link: "/profile/bookings",
            image: "/cards/buy.jpg",
        },
        {
            title: "Cars Added for Sale",
            description: "All the cars you have added for sale",
            link: "/profile/sales",
            image: "/cards/sell.jpg",
        },
    ];

    return (
        <div className="flex flex-col items-center p-8 gap-16">
            <div className="flex flex-col gap-2">
                <h1
                    style={{
                        fontFamily: "SuperBrigadeTitle",
                        letterSpacing: "-0.2rem",
                    }}
                    className="text-5xl md:text-6xl text-center font-bold"
                >
                    User Profile
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card item={cards[0]} />
                <Card item={cards[1]} />
            </div>
        </div>
    );
};

export default User;
