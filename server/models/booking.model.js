import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookType: {
        type: String,
        enum: ["Rent", "Buy"],
        required: true,
    },
    bookingStartDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    bookingEndDate: {
        type: Date,
    },
    transactionStatus: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
