import mongoose from "mongoose";
import Sale from "./sale.model.js";
import fs from "fs";
import path from "path";

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
        min: 0,
        default: 0,
    },
    rentPrice: {
        type: Number,
        min: 0,
        default: 0,
    },
    isAvailableForRent: {
        type: Boolean,
        default: false,
        required: true,
    },
    isAvailableForSale: {
        type: Boolean,
        default: true,
        required: true,
    },
    onDiscountSale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
        default: null,
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
    image: {
        type: String,
        required: true,
    },
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
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
});

const CarModel = mongoose.model("Car", carSchema);

/* ============================= GET ROUTES FOR CARS MODEL ============================= */
CarModel.getAll = async (successCallBack, errorCallBack) => {
    try {
        // Find all cars and populate the onDiscountSale field
        const cars = await CarModel.find({})
            .populate("onDiscountSale")
            .populate("owner", "name email");

        if (cars && cars.length > 0) {
            successCallBack(cars);
        } else {
            errorCallBack(204, "No Cars Found");
        }
    } catch (error) {
        errorCallBack(500, error.message);
    }
};

CarModel.getById = async (id, successCallBack, errorCallBack) => {
    try {
        console.log("Request at Get Car By Id :- ", id);

        const userRequestedCar = await CarModel.findById(id).populate(
            "owner",
            "name email"
        );

        if (!userRequestedCar) {
            throw new Error("Car Doesn't Exists");
        }

        console.log("User Requested Car :- ", userRequestedCar);

        if (userRequestedCar.onDiscountSale) {
            const sale = await Sale.findById(userRequestedCar.onDiscountSale);

            if (!sale) {
                throw new Error("Sale Doesn't Exists");
            }

            userRequestedCar.onDiscountSale = sale;
        }

        if (userRequestedCar) {
            successCallBack(userRequestedCar);
        } else {
            errorCallBack("Car Doesn't Exists");
        }
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= POST ROUTES FOR CARS MODEL ============================= */

CarModel.addCar = async (data, file, successCallBack, errorCallBack) => {
    try {
        const fileName = file.filename;

        const newCar = new CarModel({
            ...data,
            image: fileName,
            owner: new mongoose.Types.ObjectId(data.owner),
            location: {
                city: data.city,
                state: data.state,
                country: data.country,
                zipCode: data.zipCode,
            },
        });

        newCar.save();

        console.log("New Car Added :- ", newCar);

        successCallBack(newCar);
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= PUT ROUTES FOR CARS MODEL ============================= */

CarModel.editCar = async (data, id, file, successCallBack, errorCallBack) => {
    try {
        const carToEdit = await CarModel.findById(id);

        if (!carToEdit) {
            throw new Error("Car Doesn't Exists");
        }

        console.log("Car To Edit", carToEdit);

        console.log("File Name");

        if (file) {
            const __dirname = path.resolve();

            console.log("Dir Name :- ", __dirname);

            const currPath = path.join(__dirname, "uploads", carToEdit.image);

            console.log("Current Path :- ", currPath);

            fs.rmSync(currPath);
        }

        console.log("2");

        console.log("File :- ", file);

        const fileName = file ? file.filename : carToEdit.image;

        console.log("File Name :- ", fileName);

        const newCarAfterEditing = {
            image: fileName,
            location: {
                city: data.city,
                state: data.state,
                country: data.country,
                zipCode: data.zipCode,
            },
        };

        console.log("3");

        const newCarAfterUpdations = await CarModel.findByIdAndUpdate(
            id,
            newCarAfterEditing
        );

        console.log("4", newCarAfterUpdations);

        successCallBack(newCarAfterUpdations);
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= PUT ROUTES FOR CARS MODEL ============================= */

CarModel.deleteCar = async (id, successCallBack, errorCallBack) => {
    try {
        const carToDelete = CarModel.findById(id);

        if (!carToDelete) {
            throw new Error("Car Doesn't Exists");
        }

        carToDelete.delete();
    } catch (error) {
        errorCallBack(error);
    }
};

export default CarModel;
