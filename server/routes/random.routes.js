import { Router } from "express";
import mongoose from "mongoose";
import faker from "faker";
import UserModel from "../models/user.model.js";
import CarModel from "../models/car.model.js";

const router = Router();

router.get("/users/add", async (req, res) => {
    const dummyUsers = [];

    for (let i = 0; i < 30; i++) {
        dummyUsers.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: i % 5 === 0 ? "Admin" : "User", // Make every 5th user an Admin
            lastLogin: faker.date.recent(),
            created: faker.date.past(),
        });
    }

    try {
        const data = await UserModel.insertMany(dummyUsers);
        // console.log("30 dummy users have been created successfully.");
        res.status(201).send({
            message: "30 dummy users have been created successfully.",
            data,
        });
    } catch (error) {
        console.error("Error creating dummy users:", error);
    }
});

router.get("/users/get", async (req, res) => {
    try {
        // Array of Only Ids as stirgn
        const userIds = await UserModel.find({}).select("_id");

        let arrOfUserIds = [];

        userIds.forEach((user) => {
            arrOfUserIds.push(user._id);
        });

        res.status(200).send({
            message: "All User Ids Fetched Successfully",
            data: arrOfUserIds,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to Fetch User Ids",
            error,
        });
    }
});

router.post("/cars", async (req, res) => {
    try {
        const data = req.body;

        const dataAdded = await CarModel.insertMany(data);

        res.status(201).send({
            message: "Cars Added Successfully",
            data: dataAdded,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to Add Cars",
            error,
        });
    }
});

export default router;
