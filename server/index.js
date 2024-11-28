import express from "express";
import { connectDB } from "./connection/db.connection.js";

const app = express();

// app.use("/", express.static("./../frontend/dist"))

connectDB();

/* Setting up the CORS policy */
app.use('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

/* Setting up the body parser by using Default Express parse for JSON */
app.use(express.json());

/* ========== ROUTES =============== */
app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.listen(8081, () => {
    console.log("Server is running on port http://localhost:8081");
});
