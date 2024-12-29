import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../connection/db.constants.js";

export const verifyToken = (req, res, next) => 
{

    const authToken = req.get("Authorization");

    console.log("Auth Token from Verify Token :- ", authToken);

    if (!authToken) 
    {
        return res.status(401).send({ message: "Authorization token missing" });
    }

    try 
    {
        const decodedAuthToken = jwt.verify(authToken, JWT_SECRET_KEY);
        console.log("Decoded Auth Token from Verify Token :- ", decodedAuthToken);
        req.idFromToken = decodedAuthToken.userId;
        console.log("Decoded Auth Token from Verify Token :- ", decodedAuthToken);
        next(); 
    } 
    catch (error) 
    {
        console.error("Error in verifying token: ", error);
        res.status(401).send({ message: "Invalid Credentials" });
    }
};
