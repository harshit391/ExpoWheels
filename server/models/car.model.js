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
        const cars = await CarModel.find({});

        if (cars) {
            successCallBack(cars);
        } else {
            errorCallBack(204, "No Cars Found");
        }
    } catch (error) {
        errorCallBack(500, error);
    }
};

CarModel.getById = async (id, successCallBack, errorCallBack) => {
    try {
        const userRequestedCar = CarModel.findById(id);

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

CarModel.addCar = async (data, successCallBack, errorCallBack) => {
    try {
        const newCar = new CarModel(data);

        newCar.save();

        successCallBack(newCar);
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= PUT ROUTES FOR CARS MODEL ============================= */

CarModel.editCar = async (data, id, successCallBack, errorCallBack) => {
    try {
        const carToEdit = CarModel.findById(id);

        if (!carToEdit) {
            throw new Error("Car Doesn't Exists");
        }

        const newCarAfterEditing = { ...carToEdit, data };

        successCallBack(newCarAfterEditing);
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
