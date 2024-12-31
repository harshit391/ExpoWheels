import express from "express";
import { connectDB } from "./connection/db.connection.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import carRoutes from "./routes/cars.routes.js";
import randomRoutes from "./routes/random.routes.js";
import saleRoutes from "./routes/sales.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

// Constants
import { CLIENT_URL, PORT } from "./connection/db.constants.js";

const app = express();

connectDB();

// Middleware to allow cross-origin requests
app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${CLIENT_URL}`);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    next();
});

app.use(express.json());
app.use(express.static("./uploads"));

/* =============== ROUTES =============== */
app.use("/api/auth", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/random", randomRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
