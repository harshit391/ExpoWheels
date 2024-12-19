import express from "express";
import { connectDB } from "./connection/db.connection.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// app.use("/", express.static("./../frontend/dist"))

connectDB();

/* Setting up the CORS policy */
app.use("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

/* Setting up the body parser by using Default Express parse for JSON */
app.use(express.json());

/* =============== ROUTES =============== */
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.listen(8081, () => {
    console.log("Server is running on port http://localhost:8081");
});
