import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
    const [useLoggedIn, setUserLoggedIn] = useState(false);

    const [collapse, setCollapse] = useState(true);

    return (
        <div className="flex md:flex-row flex-col gap-4 p-4 justify-between md:items-center">
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
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={
                    collapse ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }
                }
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className={`flex md:flex-row flex-col ${
                    collapse ? "hidden" : "flex"
                } md:flex gap-4 font-semibold`}
            >
                <div>Home</div>
                <div>About Us</div>
                <div>Buy Cars</div>
                <div>Sell Cars</div>
                <div>Rent Cars</div>
                <div>Contact Us</div>
            </motion.div>
            {!useLoggedIn && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={
                        collapse ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }
                    }
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        boxShadow: "2px 4px 15px black",
                    }}
                    className={`flex ${
                        collapse ? "hidden" : "flex"
                    } md:flex gap-4 font-semibold bg-black text-white px-4 py-2 rounded max-w-max`}
                >
                    <div>Login / Register</div>
                </motion.div>
            )}
            {useLoggedIn && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={
                        collapse ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }
                    }
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${
                        collapse ? "hidden" : "flex"
                    } md:flex gap-4 font-semibold`}
                >
                    <div>Logout</div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
