import express from "express";
import UserModel from "../models/user.model.js";
import { verifyToken } from "../utils/auth.utils.js";

const router = express.Router();

router.get("/:id", verifyToken, (req, res) => {
    UserModel.getUser(
        req,

        // Success Call Back
        (dbRes) => {
            res.status(201).send({ message: "Request Success", user: dbRes });
        },

        // Error Call Back
        (dbRes) => {
            res.status(400).send({ message: "InValid Request", error: dbRes });
        }
    );
});

router.post("/register", (req, res) => {
    const user = req.body;

    UserModel.addUser(
        user,

        // Success Callback
        (dbres) => {
            res.status(201).send({
                message: "User Creation Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            if (dbres.Error == "ValidationError")
                res.status(400).send({
                    message: "Invalid Details from Client",
                    error: dbres,
                });
            else
                res.status(500).send({
                    message: "User Creation Failed",
                    error: dbres,
                });
        }
    );
});

router.post("/signin", (req, res) => {
    const user = req.body;

    UserModel.signIn(
        user,

        // Success Callback
        (dbres) => {
            // console.log("The User Object :- ", dbres);
            res.status(201).send({
                message: "User Authenticated Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            res.status(401).send({
                message: "User Authentication Failed",
                error: dbres,
            });
        }
    );
});

router.post("/verify", (req, res) => {

    const token = req.body.token;

    UserModel.verifyToken(
        token,

        // Success Callback
        (dbres) => {
            res.status(201).send({
                message: "Token Verified Successfully",
                user: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            res.status(401).send({
                message: "Token Verification Failed",
                error: dbres,
            });
        }
    );
})

export default router;
