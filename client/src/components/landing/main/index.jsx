const Welcome = () => {
    return (
        <div className="p-4">
            <h1
                style={{
                    fontFamily: "SuperBrigadeTitle",
                    letterSpacing: "-0.2rem",
                }}
                className="text-4xl text-center font-bold"
            >
                Expo Wheels
            </h1>
            <p
                style={{
                    fontFamily: "SuperBrigadeCondensed",
                }}
                className="text-center"
            >
                Drive Your Dream, Your Way
            </p>
            <div className="grid grid-cols-3">
                {/* <Card item={carData[0]} />
                <Card item={carData[1]} />
                <Card item={carData[2]} /> */}
            </div>
        </div>
    );
};

export default Welcome;
