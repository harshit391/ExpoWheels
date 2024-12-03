import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
    const [useLoggedIn, setUserLoggedIn] = useState(true);

    const [collapse, setCollapse] = useState(false);

    return (
        <div
            className={`flex md:flex-row flex-col gap-4 p-4 justify-between md:items-center`}
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
                <div className={`flex md:hidden`}>
                    <button
                        onClick={() => setCollapse(!collapse)}
                        className="bg-black text-white p-2 rounded-md"
                    >
                        {collapse ? "Close" : "Menu"}
                    </button>
                </div>
            </div>
            <div className={`flex md:flex-row flex-col ${collapse ? "hidden" : "flex"} md:flex gap-4 font-semibold`}>
                <div>Home</div>
                <div>About Us</div>
                <div>Buy Cars</div>
                <div>Sell Cars</div>
                <div>Rent Cars</div>
                <div>Contact Us</div>
            </div>
            {!useLoggedIn && (
                <div className="flex gap-2 font-semibold">
                    <div>Login</div>
                    <div>Register</div>
                </div>
            )}
            {useLoggedIn && (
                <div className="flex gap-2 font-semibold">
                    <div>Logout</div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
