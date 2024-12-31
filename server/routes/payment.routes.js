import { Router } from "express";
// import Razorpay from "razorpay";

// import {
//     RAZORPAY_KEY_ID,
//     RAZORPAY_SECRET_KEY,
// } from "../connection/db.constants.js";

import { verifyToken } from "../utils/auth.utils.js";
import mongoose from "mongoose";

const router = Router();

// const razorpay = new Razorpay({
//     key_id: RAZORPAY_KEY_ID,
//     key_secret: RAZORPAY_SECRET_KEY,
// });

router.post("/order", verifyToken, async (req, res) => {
    try {
        const { amount } = req.body;

        // console.log("Amount :- ", amount);

        const options = {
            amount: amount,
            currency: "USD",
            receipt: `receipt_${Date.now()}`,
        };

        // console.log("Options :- ", options);

        const order = {
            id: new mongoose.Types.ObjectId(),
            amount: options.amount,
            currency: options.currency,
            receipt: options.receipt,
            status: "created",
            created_at: Date.now(),
        };

        // console.log("Order Details :- ", order);

        res.status(200).send({
            message: "Order Created",
            order: order,
        });
    } catch (error) {
        console.error("Error :- ", error);

        res.status(500).send(error.message);
    }
});

export default router;
