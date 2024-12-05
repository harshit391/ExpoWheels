import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
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
    salePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    saleDate: {
        type: Date,
        default: Date.now,
    },
    saleScheme: {
        discountPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        additionalBenefits: {
            type: String,
            default: "",
        },
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "Bank Transfer", "Online Payment"],
        required: true,
    },
    transactionStatus: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    },
    additionalNotes: {
        type: String,
        default: "",
    },
});

const Sale = mongoose.model("Sale", saleSchema);
