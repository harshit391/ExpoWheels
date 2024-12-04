import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../../utils/auth";
import { motion } from "framer-motion";

const Login = () => {
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "Buyer",
    });

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value,
        });
    };

    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await createUser(details);
            if (response) {
                alert("User Created Successfully");
                setDetails({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    userType: "",
                });
            }
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen">
            <div
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(/auth-bg.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="flex flex-col min-h-screen justify-center w-full"
            >
                <div
                    className="text-4xl text-white text-center"
                    style={{
                        fontFamily: "SuperBrigadeTitle",
                    }}
                >
                    Welcome to Expo Wheels
                </div>
                <div
                    className="text-2xl text-white text-center p-4"
                    style={{
                        fontFamily: "SuperBrigadeCondensed",
                        letterSpacing: "0.2rem",
                    }}
                >
                    Drive your dream, Your way
                </div>
            </div>
            <div className="w-full flex justify-center">
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            delay: 0.1,
                            duration: 0.25,
                        },
                    }}
                    style={{
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.7)",
                    }}
                    className="flex m-16 flex-col items-center w-3/5 px-4 py-8 justify-around bg-black border-2 border-solid border-black gap-4 rounded"
                >
                    <div
                        className="font-bold text-3xl text-white text-center"
                        style={{
                            fontFamily: "SuperBrigadeTitle",
                            letterSpacing: "-0.2rem",
                        }}
                    >
                        Sign Up
                    </div>
                    <div className="w-4/5 flex flex-col justify-center">
                        <div className="flex flex-col gap-4 p-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-white" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="p-2 border-2 text-black border-black border-solid rounded"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={details.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="p-2 border-2 text-black border-black border-solid rounded"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={details.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-white"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="p-2 border-2 text-black border-black border-solid rounded"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={details.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-white"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="p-2 border-2 text-black border-black border-solid rounded"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={details.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-4 mt-2 items-center w-full">
                                <label
                                    className="text-white w-3/5"
                                    htmlFor="confirmPassword"
                                >
                                    User Type
                                </label>
                                <select
                                    className="p-2 border-2 w-full text-black border-black border-solid rounded"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={(e) =>
                                        setDetails({
                                            ...details,
                                            userType: e.target.value,
                                        })
                                    }
                                >
                                    <option value="Buyer">Buyer</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-4">
                            <div className="p-4 text-center text-white">
                                Already Have an Account ?{" "}
                                <Link to="/login" className="hover:underline">
                                    Login
                                </Link>
                            </div>
                            <div className="flex justify-center w-full">
                                {!loading ? (
                                    <button
                                        onClick={handleFormSubmit}
                                        className="bg-white px-4 w-full py-2 rounded"
                                    >
                                        Register
                                    </button>
                                ) : (
                                    <button className="bg-white px-4 w-full py-2 rounded">
                                        {"Please Wait..."}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
