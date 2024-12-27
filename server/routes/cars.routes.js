import { Router } from "express";
import CarModel from "../models/car.model.js";

const router = Router();

/* ============================= GET ROUTES FOR CARS MODEL ============================= */

router.get("/get", async (req, res) => {
    await CarModel.getAll(
        // Success Callback
        (dbres) => {
            res.status(200).send({
                message: "Cars Fetched Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (status, dbres) => {
            res.status(status).send({
                message: "Failed to Fetch Cars",
                error: dbres,
            });
        }
    );
});

router.get("/get/:id", (req, res) => {
    const id = req.params.id;

    CarModel.getById(
        id,
        (dbres) => {
            res.status(200).send({
                message: "Cars Details Fetched Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            res.status(500).send({
                message: "Failed to Fetch Car Details",
                error: dbres,
            });
        }
    );
});

/* ============================= POST ROUTES FOR CARS MODEL ============================= */

router.post("/add", (req, res) => {
    const data = req.body;

    CarModel.addCar(
        data,

        (dbres) => {
            res.status(201).send({
                message: "Car Added Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            res.status(500).send({
                message: "Failed to Add Car",
                error: dbres,
            });
        }
    );
});

/* ============================= PUT ROUTES FOR CARS MODEL ============================= */

router.put("/edit/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;

    CarModel.editCar(
        data,
        id,

        (dbres) => {
            res.status(201).send({
                message: "Car Edited Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            res.status(500).send({
                message: "Failed to Add Car",
                error: dbres,
            });
        }
    );
});

/* ============================= DELETE ROUTES FOR CARS MODEL ============================= */

router.delete("/remove/:id", (req, res) => {
    const id = req.params.id;

    CarModel.deleteCar(
        id,

        (dbres) => {
            res.status(201).send({
                message: "Car Edited Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            res.status(500).send({
                message: "Failed to Add Car",
                error: dbres,
            });
        }
    );
});

export default router;
