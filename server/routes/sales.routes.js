import { Router } from "express";
import Sale from "../models/sale.model.js";
import { verifyToken } from "../utils/auth.utils.js";

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

router.post("/set", verifyToken, (req, res) => {
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

/* ============================= PUT ROUTES FOR SALES MODEL ============================= */

router.put("/set/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const data = req.body;

    Sale.editSale(
        id,
        data,
        (dbres) => {
            res.status(200).send({
                message: "Sale Updated Successfully",
                data: dbres,
            });
        },
        (status, dbres) => {
            res.status(status).send({
                message: "Failed to Update Sale",
                error: dbres,
            });
        }
    );
});

/* ============================= DELETE ROUTES FOR SALES MODEL ============================= */

router.delete("/remove/:id", verifyToken, (req, res) => {
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
