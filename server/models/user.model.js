import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../connection/db.constants.js";

const userScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        created: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userScheme);

/* GET User */
UserModel.getUser = async (req, sucessCallBack, errorCallback) => {
    const idFromReq = req?.params?.id;
    const idFromAuthToken = req?.idFromToken;

    // console.log("Id From Request :- ", idFromReq);
    // console.log("Id From Token :- ", idFromAuthToken);

    if (idFromAuthToken !== idFromReq) {
        errorCallback("Invalid Credentials");
    }

    try {
        const user = await UserModel.findById(idFromReq);

        if (user) {
            sucessCallBack(user);
        } else {
            errorCallback("User Not Found");
        }
    } catch (error) {
        errorCallback(error);
    }
};

/* ----------------------------------------------------------------------------------------------------------- */
/* CRUD Operations */

// 1. Create a new User
UserModel.addUser = async (user, sucessCallBack, errorCallback) => {
    let encryptedPassword = null;
    if (user?.password) {
        try {
            encryptedPassword = bcrypt.hashSync(user.password, 10);
        } catch (error) {
            console.error("Error in encrypting password: ", error);
            errorCallback(error);
        }
    }

    try {
        const userAlreadyExists = await UserModel.findOne({
            email: user.email,
        });

        if (userAlreadyExists) {
            if (userAlreadyExists.role == user.role) {
                errorCallback("User Already Exists");
                return;
            }
        }

        const newUser = await UserModel.insertMany([
            { ...user, password: encryptedPassword },
        ]);

        // console.log("Post | SignUp :- ", newUser[0]);
        // console.log("Post | SignUpID :- ", newUser[0]._id);

        const token = jwt.sign(
            {
                userId: newUser[0]._id,
                email: user.email,
                role: newUser[0].role,
            },
            JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        // console.log("Post | token is: ", token);
        sucessCallBack({ token: token, user: newUser[0] });
    } catch (error) {
        console.error("Post | dbErr is: ", error);
        errorCallback(error);
    }
};

// 2. Sign In an existing User
UserModel.signIn = async (user, sucessCallBack, errorCallback) => {
    try {
        // Finding the User in the Database
        const dbRes = await UserModel.findOne({ email: user.email });

        // console.log("Post | SingIn dbres is: ", dbRes);

        // console.log("User Recieved At Sign In :- ", user);

        // If User Exists
        if (dbRes) {
            // Comparing the Password
            const isPasswordMatch = bcrypt.compareSync(
                user.password,
                dbRes.password
            );

            // console.log(isPasswordMatch);

            if (isPasswordMatch) {
                // Creating a JWT Token if Password Matches
                const token = jwt.sign(
                    { userId: dbRes._id, email: dbRes.email, role: dbRes.role },
                    JWT_SECRET_KEY,
                    { expiresIn: "7d" }
                );

                // console.log("Post | authToken is: ", token);

                sucessCallBack({ token: token, user: dbRes });
            } else {
                errorCallback("Invalid Password");
            }
        } else {
            errorCallback("User Do Not Exist");
        }
    } catch (error) {
        console.error("Post | dbErr is: ", error);
        errorCallback(error);
    }
};

UserModel.verifyToken = async (token, sucessCallBack, errorCallback) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        // console.log("Decoded Token :- ", decodedToken);

        const userExists = await UserModel.findById(decodedToken.userId);

        if (!userExists) {
            errorCallback("User Not Found");
            return;
        }

        sucessCallBack(decodedToken);
    } catch (error) {
        console.error("Error in verifying token: ", error);
        errorCallback(error);
    }
};

export default UserModel;
