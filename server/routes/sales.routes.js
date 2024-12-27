import { Router } from "express";
import Sale from "../models/sale.model.js";

const router = Router();

/* ============================= GET ROUTES FOR SALES MODEL ============================= */

router.get("/get", (req, res) => {
    Sale.getAll(
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

/* ============================= POST ROUTES FOR SALES MODEL ============================= */

router.post("/set", (req, res) => {
    const data = req.body;

    Sale.addSale(
        data,
        (dbres) => {
            res.status(201).send({
                message: "Sale Added Successfully",
                data: dbres,
            });
        },
        (status, dbres) => {
            res.status(status).send({
                message: "Failed to Add Sale",
                error: dbres,
            });
        }
    );
});

/* ============================= DELETE ROUTES FOR SALES MODEL ============================= */

router.delete("/remove/:id", (req, res) => {
    const id = req.params.id;

    Sale.removeSale(
        id,
        (dbres) => {
            res.status(200).send({
                message: "Sale Removed Successfully",
                data: dbres,
            });
        },
        (status, dbres) => {
            res.status(status).send({
                message: "Failed to Remove Sale",
                error: dbres,
            });
        }
    );
});

export default router;
