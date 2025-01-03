import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../../utils/auth";
import { motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/context";
import { SECRET_KEY } from "../../../utils/constants";

const Register = () => {
    const navigate = useNavigate();

    const { setUser, setAdmin } = useAuth();

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
                alert(response.message);
                setUser(response.user);
                if (response.user.role === SECRET_KEY) {
                    setAdmin(response.user);
                } else {
                    setAdmin(null);
                }
                navigate("/");
            } else {
                alert("User Not Created");
            }
            setDetails({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex md:flex-row flex-col p-0 min-h-screen">
            <div
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(/auth-bg.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="flex flex-col py-8 pt-20 md:min-h-screen justify-center w-full"
            >
                <div
                    style={{
                        fontFamily: "Poppins",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.7)",
                    }}
                >
                    <Link
                        to="/"
                        className="absolute top-4 md:top-7 flex gap-2 justify-center items-center left-4 md:left-7 p-2 md:p-4 bg-white text-black rounded font-bold"
                    >
                        <FaChevronLeft />
                        <div className="text-sm md:text-xl">Go Back</div>
                    </Link>
                </div>
                <div
                    className="text-2xl md:text-4xl text-white text-center"
                    style={{
                        fontFamily: "SuperBrigadeTitle",
                    }}
                >
                    Welcome to Expo Wheels
                </div>
                <div
                    className="text-md md:text-2xl text-white text-center p-4"
                    style={{
                        fontFamily: "SuperBrigadeCondensed",
                        letterSpacing: "0.1rem",
                    }}
                >
                    Drive your dream, Your way
                </div>
            </div>
            <div className="w-full p-8 md:p-4 flex justify-center items-center">
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
                    className="flex flex-col justify-center items-center w-full md:w-3/5 px-4 py-8 bg-black border-2 border-solid border-black gap-4 rounded"
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
                    <div className="md:w-4/5 w-full flex flex-col gap-4 justify-center">
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleFormSubmit(e);
                                        }
                                    }}
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleFormSubmit(e);
                                        }
                                    }}
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleFormSubmit(e);
                                        }
                                    }}
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleFormSubmit(e);
                                        }
                                    }}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <div className="text-center font-bold text-white">
                                Already Have an Account ?{" "}
                                <Link to="/login" className="hover:underline">
                                    Login
                                </Link>
                            </div>
                            <div className="flex justify-center w-full px-4">
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

export default Register;
