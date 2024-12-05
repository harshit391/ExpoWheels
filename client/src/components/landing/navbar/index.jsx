import { Link } from "react-router-dom";
import { useAuth } from "../../../context/context";
import { useState } from "react";

const Navbar = () => {
    const { user, admin, setUser, setAdmin } = useAuth();
    const [collapse, setCollapse] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("eWauthToken");
        alert("Logged Out Successfully");
        setUser(null);
        setAdmin(null);
    };

    return (
        <div
            style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.75)",
                fontFamily: "Poppins",
            }}
            className="z-50 flex md:flex-row flex-col gap-4 p-4 justify-between md:items-center"
        >
            <div className="flex justify-between w-full md:w-max">
                <div className="flex gap-2">
                    <img
                        src="/EXPOWHEELS.png"
                        width={40}
                        height={40}
                        alt="logo"
                    />
                    <div
                        className="italic font-bold"
                        style={{ fontFamily: "Poppins" }}
                    >
                        <h1>EXPO</h1>
                        <h1>WHEELS</h1>
                    </div>
                </div>
                <div className="flex md:hidden">
                    <button
                        onClick={() => setCollapse(!collapse)}
                        className="bg-black text-white p-2 rounded-md"
                    >
                        {collapse ? "Menu" : "Close"}
                    </button>
                </div>
            </div>

            <div
                className={`flex md:flex-row font-bold flex-col ${
                    collapse ? "hidden" : "flex"
                } md:flex gap-4 font-semibold`}
            >
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/buy">Buy Cars</Link>
                <Link to="/sell">Sell Cars</Link>
                <Link to="/rend">Rent Cars</Link>
                <Link to="/contact">Contact Us</Link>
                {admin && <Link to="/admin">Admin</Link>}
            </div>

            {/* Login/Logout Section */}
            {!user && (
                <Link
                    to="/login"
                    style={{
                        boxShadow: "2px 4px 15px black",
                    }}
                    className={`flex ${
                        collapse ? "hidden" : "flex"
                    } md:flex gap-4 font-semibold bg-black text-white px-4 py-2 rounded max-w-max`}
                >
                    <div>Login / Register</div>
                </Link>
            )}
            {user && (
                <div
                    onClick={handleLogout}
                    style={{
                        boxShadow: "2px 4px 15px black",
                    }}
                    className={`flex ${
                        collapse ? "hidden" : "flex"
                    } md:flex gap-4 cursor-pointer font-semibold bg-black text-white px-4 py-2 rounded max-w-max`}
                >
                    <div>Logout</div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
