import { Router } from "express";
import CarModel from "../models/car.model.js";
import upload from "../utils/multer.utils.js";
import { verifyToken } from "../utils/auth.utils.js";

const router = Router();

/* ============================= GET ROUTES FOR CARS MODEL ============================= */

router.get("/get", async (req, res) => {
    const queries = req.query;

    await CarModel.getAll(
        queries,

        // Success Callback
        (dbres) => {
            res.status(200).send({
                message: "Cars Fetched Successfully",
                data: dbres.cars,
                brands: dbres.brands,
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

router.get("/user/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    CarModel.getUserSales(
        id,
        (dbres) => {
            res.status(200).send({
                message: "Cars Details Fetched Successfully",
                sales: dbres,
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

router.post("/add", verifyToken, upload.single("image"), (req, res) => {
    const data = req.body;
    const file = req.file;

    CarModel.addCar(
        data,
        file,

        (dbres) => {
            res.status(201).send({
                message: "Car Added Successfully",
                data: dbres,
            });
        },

        // Error Callback
        (dbres) => {
            // console.log(dbres);
            res.status(500).send({
                message: "Failed to Add Car",
                error: dbres,
            });
        }
    );
});

/* ============================= PUT ROUTES FOR CARS MODEL ============================= */

router.put("/edit/:id", verifyToken, upload.single("image"), (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const file = req.file;

    CarModel.editCar(
        data,
        id,
        file,

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

router.delete("/remove/:id", verifyToken, (req, res) => {
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
