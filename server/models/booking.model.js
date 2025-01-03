import mongoose from "mongoose";
import CarModel from "./car.model.js";
import UserModel from "./user.model.js";
import Sale from "./sale.model.js";

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
    pricePaid: {
        type: Number,
        required: true,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

/* ============================= GET ROUTES ============================= */
Booking.getAllBookings = async function (sucessCallBack, errorCallBack) {
    try {
        const bookings = await Booking.find();

        if (!bookings) {
            throw new Error("No bookings found");
        }

        sucessCallBack(bookings);
    } catch (error) {
        errorCallBack(error);
    }
};

Booking.getById = async (id, sucessCallBack, errorCallBack) => {
    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            throw new Error("No booking found");
        }

        sucessCallBack(booking);
    } catch (error) {
        errorCallBack(error);
    }
};

Booking.getByUserId = async (id, type, sucessCallBack, errorCallBack) => {
    try {
        const bookings = await Booking.find({
            buyer: id,
            bookType: type,
        }).populate("car");

        if (!bookings) {
            throw new Error("No bookings found");
        }

        // console.log("Bookings: ", bookings);

        // Extract cars from bookings and add pricePaid also to the cars and End Date if Type is Rent
        const cars = bookings.map((booking) => {
            let car = {
                ...booking.car._doc,
                pricePaid: booking.pricePaid,
                endDate: booking.bookingEndDate ? booking.bookingEndDate : null,
                bookType: booking.bookType,
            };

            // console.log("Car: ", car);
            return car;
        });

        sucessCallBack(cars);
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= POST ROUTES ============================= */
Booking.createBooking = async function (data, sucessCallBack, errorCallBack) {
    try {
        // console.log("Booking Data: ", data);

        const newBooking = new Booking({
            ...data,
            endDate: data.type === "Rent" ? data.endDate : null,
        });

        // console.log("New Booking: ", newBooking);

        const car = await CarModel.findById(data.car);

        if (!car) {
            throw new Error("No car found");
        }

        car.isAvailableForRent = false;
        car.isAvailableForSale = false;

        if (car.onDiscountSale) {
            const sale = await Sale.findByIdAndDelete(car.onDiscountSale);

            if (!sale) {
                throw new Error("No sale found");
            }

            car.onDiscountSale = null;
        }

        const user = await UserModel.findById(data.buyer);

        if (!user) {
            throw new Error("No user found");
        }

        if (user.bookings == null) {
            user.bookings = [];
        }

        user.bookings.push(newBooking._id);

        if (data.type === "Buy") {
            car.owner = user._id;
        }

        car.booking = newBooking._id;

        await car.save();
        await newBooking.save();
        await user.save();
        sucessCallBack(newBooking);
    } catch (error) {
        console.log("Error: ", error);
        errorCallBack(error);
    }
};

/* ============================= PUT ROUTES ============================= */
Booking.updateBooking = async function (
    id,
    data,
    sucessCallBack,
    errorCallBack
) {
    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            throw new Error("No booking found");
        }

        booking.set(data);

        await booking.save();

        sucessCallBack(booking);
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= DELETE ROUTES ============================= */
Booking.deleteBooking = async function (id, sucessCallBack, errorCallBack) {
    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            throw new Error("No booking found");
        }

        const user = await UserModel.findById(booking.buyer);

        if (!user) {
            throw new Error("No user found");
        }

        const car = await CarModel.findById(booking.car);

        if (!car) {
            throw new Error("No car found");
        }

        if (booking.bookType === "Rent") {
            car.isAvailableForRent = true;
        } else {
            car.isAvailableForSale = true;
        }

        const index = user.bookings.indexOf(booking._id);

        if (index > -1) {
            user.bookings.splice(index, 1);
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);
        await car.save();
        await user.save();

        sucessCallBack(deletedBooking);
    } catch (error) {
        console.log("Error: ", error);
        errorCallBack(error);
    }
};
