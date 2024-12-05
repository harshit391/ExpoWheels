import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1886,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    isAvailableForRent: {
        type: Boolean,
        default: false,
    },
    isAvailableForSale: {
        type: Boolean,
        default: true,
    },
    fuelType: {
        type: String,
        enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"],
        required: true,
    },
    mileage: {
        type: Number,
        required: true,
    },
    transmission: {
        type: String,
        enum: ["Manual", "Automatic", "Semi-Automatic"],
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // images: [
    //     {
    //         url: {
    //             type: String,
    //             required: true,
    //         },
    //         altText: {
    //             type: String,
    //             default: "Car image",
    //         },
    //     },
    // ],
    location: {
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    dateListed: {
        type: Date,
        default: Date.now,
    },
    rentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
});

const CarModel = mongoose.model("Car", carSchema);
