import { Router } from "express";
import Booking from "../models/booking.model.js";
import { verifyToken } from "../utils/auth.utils.js";

const router = Router();

router.get("/", verifyToken, (req, res) => {
    Booking.getAll(
        (dbRes) => {
            res.status(201).send({
                message: "Request Success",
                bookings: dbRes,
            });
        },

        (dbRes) => {
            res.status(500).send({ message: "InValid Request", error: dbRes });
        }
    );
});

router.get("/:id", verifyToken, (req, res) => {
    Booking.getBooking(
        req.params.id,

        (dbRes) => {
            res.status(201).send({
                message: "Request Success",
                booking: dbRes,
            });
        },

        (dbRes) => {
            res.status(500).send({ message: "InValid Request", error: dbRes });
        }
    );
});

router.get("/user/:id", verifyToken, (req, res) => {
    Booking.getByUserId(
        req.params.id,
        req.query.type,

        (dbRes) => {
            res.status(201).send({
                message: "Request Success",
                bookings: dbRes,
            });
        },

        (dbRes) => {
            res.status(500).send({ message: "InValid Request", error: dbRes });
        }
    );
});

router.post("/create", verifyToken, (req, res) => {
    Booking.createBooking(
        req.body,

        (dbRes) => {
            res.status(201).send({
                message: "Request Success",
                booking: dbRes,
            });
        },

        (dbRes) => {
            res.status(500).send({ message: "InValid Request", error: dbRes });
        }
    );
});

router.put("/:id", verifyToken, (req, res) => {
    Booking.updateBooking(
        req.params.id,
        req.body,

        (dbRes) => {
            res.status(201).send({
                message: "Request Success",
                booking: dbRes,
            });
        },

        (dbRes) => {
            res.status(500).send({ message: "InValid Request", error: dbRes });
        }
    );
});

router.delete("/:id", verifyToken, (req, res) => {
    Booking.deleteBooking(
        req.params.id,

        (dbRes) => {
            res.status(201).send({
                message: "Request Success",
                booking: dbRes,
            });
        },

        (dbRes) => {
            res.status(500).send({ message: "InValid Request", error: dbRes });
        }
    );
});

export default router;
