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

        sucessCallBack(bookings);
    } catch (error) {
        errorCallBack(error);
    }
};

/* ============================= POST ROUTES ============================= */
Booking.createBooking = async function (data, sucessCallBack, errorCallBack) {
    try {
        const newBooking = new Booking(data);

        await newBooking.save();

        sucessCallBack(newBooking);
    } catch (error) {
        errorCallBack(error);
    }
};

Booking.createRentBooking = async function (
    data,
    sucessCallBack,
    errorCallBack
) {
    try {
        const newBooking = new Booking(data);

        await newBooking.save();

        sucessCallBack(newBooking);
    } catch (error) {
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

        await booking.remove();

        sucessCallBack(booking);
    } catch (error) {
        errorCallBack(error);
    }
};
