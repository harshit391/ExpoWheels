import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    saleDate: {
        type: Date,
        required: true,
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
});

const Sale = mongoose.model("Sale", saleSchema);
