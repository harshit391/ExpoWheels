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
        default: () => {
            const now = new Date();
            return new Date(now.setDate(now.getDate() + 5));
        },
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
        const sales = await Sale.find({}).populate("car");

        if (!sales) {
            errorCallBack(204, "No Sales Found");
            return;
        }

        successCallBack(sales);
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

Sale.editSale = async (id, data, successCallBack, errorCallBack) => {
    try {
        const sale = await Sale.findById(id);

        if (!sale) {
            errorCallBack(404, "Sale Not Found");
            return;
        }

        const dbres = await Sale.findByIdAndUpdate(id, data, {
            new: true,
        });

        successCallBack(dbres);
    } catch (error) {
        errorCallBack(500, error);
    }
};

Sale.removeSale = async (id, successCallBack, errorCallBack) => {
    try {
        const sale = await Sale.findById(id);

        if (!sale) {
            errorCallBack(404, "Sale Not Found");
            return;
        }

        const car = await CarModel.findById(sale.car);

        if (!car) {
            errorCallBack(404, "Car Not Found");
            return;
        }

        const newCarData = {
            ...car._doc,
            onDiscountSale: null,
        };

        const updatedCar = await CarModel.findByIdAndUpdate(
            sale.car,
            newCarData,
            {
                new: true,
            }
        );

        if (!updatedCar) {
            errorCallBack(500, "Failed to Update Car");
            return;
        }

        const dbres = await Sale.findByIdAndDelete(id);

        successCallBack(dbres);
    } catch (error) {
        errorCallBack(500, error);
    }
};

export default Sale;
