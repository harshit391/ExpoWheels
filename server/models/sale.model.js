import mongoose from "mongoose";
import CarModel from "./car.model.js";

const saleSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    saleDate: {
        type: Date,
        default: Date.now,
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
});

const Sale = mongoose.model("Sale", saleSchema);

Sale.getAll = async (successCallBack, errorCallBack) => {
    try {
        const sales = await Sale.find({});

        if (!sales) {
            errorCallBack(204, "No Sales Found");
            return;
        }

        const cars = await CarModel.find({});

        if (!cars) {
            errorCallBack(204, "No Cars Found");
            return;
        }

        const newSales = { ...sales };

        sales.forEach((sale) => {
            cars.forEach((car) => {
                if (sale.car.toString() === car._id.toString()) {
                    newSales.car = car;
                }
            });
        });

        successCallBack(newSales);
    } catch (error) {
        errorCallBack(500, error);
    }
};

Sale.addSale = async (data, successCallBack, errorCallBack) => {
    try {
        const carAvailable = await CarModel.findById(data.car);

        if (!carAvailable) {
            errorCallBack(404, "Car Not Found");
            return;
        }

        const sale = new Sale(data);

        const newCarData = {
            ...carAvailable._doc,
            onDiscountSale: sale._id,
        };

        const updatedCar = await CarModel.findByIdAndUpdate(
            data.car,
            newCarData,
            {
                new: true,
            }
        );

        if (!updatedCar) {
            errorCallBack(500, "Failed to Update Car");
            return;
        }

        const dbres = await sale.save();

        successCallBack(dbres);
    } catch (error) {
        errorCallBack(500, error);
    }
};

export default Sale;
