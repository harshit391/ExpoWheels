import { Router } from "express";
import Booking from "../models/booking.model.js";

const app = Router();

app.get("/", (req, res) => {
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

app.get("/:id", (req, res) => {
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

app.get("/user/:id", (req, res) => {
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

app.post("/buy", (req, res) => {
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

app.post("/rent", (req, res) => {
    Booking.createRentBooking(
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

app.put("/:id", (req, res) => {
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

app.delete("/:id", (req, res) => {
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

export default app;
