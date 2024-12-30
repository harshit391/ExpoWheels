import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../connection/db.constants.js";

export const verifyToken = (req, res, next) => {
    const authToken = req.get("Authorization");

    if (!authToken) {
        return res.status(401).send({ message: "Authorization token missing" });
    }

    try {
        const decodedAuthToken = jwt.verify(authToken, JWT_SECRET_KEY);
        req.idFromToken = decodedAuthToken.userId;
        next();
    } catch (error) {
        console.error("Error in verifying token: ", error);
        res.status(401).send({ message: "Invalid Credentials" });
    }
};
