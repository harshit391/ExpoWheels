import { Link } from "react-router-dom";

const Card = ({ item }) => {
    return (
        <Link
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            to={item.link}
            className="p-4 w-full h-64 flex justify-center items-center w-full rounded hover:transform hover:scale-105 transition-transform duration-500"
        >
            <div className="flex flex-col p-4 text-white items-center justify-center w-full">
                <h2 className="p-4 font-black text-4xl" style={{fontFamily: "SuperBrigade", letterSpacing: "0.15rem"}}>{item.title}</h2>
                <p className="text-xl text-center">{item.description}</p>
            </div>
        </Link>
    );
};

export default Card;
