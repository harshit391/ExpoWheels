import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const MONGO_URI = process.env.MONGO_URI;
export const CLIENT_URL = process.env.CLIENT_URL;
export const PORT = process.env.PORT;

export const RAZORPAY_KEY_ID = process.env.RAZOR_KEY_ID;
export const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;
