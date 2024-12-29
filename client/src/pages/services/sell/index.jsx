import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL_EWS } from "../../../utils/constants";

const Sell = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        rentPrice: "",
        isAvailableForRent: false,
        isAvailableForSale: false,
        fuelType: "Petrol",
        mileage: "",
        transmission: "Manual",
        location: {
            city: "",
            state: "",
            country: "",
            zipCode: "",
        },
        image: null,
    });

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("location.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                    [field]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value === "true",
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                setFormData((prev) => ({
                    ...prev,
                    imageError: "Please upload a valid image file.",
                }));
                return;
            }

            if (e.target.files.length > 1) {
                setFormData((prev) => ({
                    ...prev,
                    imageError: "You can only upload one image.",
                }));
                return;
            }

            const img = new Image();
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                const aspectRatio = width / height;

                if (aspectRatio !== 16 / 9) {
                    setFormData((prev) => ({
                        ...prev,
                        imageError: "The image must have a 16:9 aspect ratio.",
                    }));
                    return;
                }

                setFormData((prev) => ({
                    ...prev,
                    image: file,
                    imageError: "",
                }));
            };
            img.onerror = () => {
                setFormData((prev) => ({
                    ...prev,
                    imageError: "Error loading the image.",
                }));
            };
            img.src = URL.createObjectURL(file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();

        for (const key in formData) {
            if (key === "location") {
                for (const locKey in formData.location) {
                    if (!formData.location[locKey]) {
                        alert("Please fill in all the fields.");
                        return;
                    }
                    formDataToSubmit.append(locKey, formData.location[locKey]);
                }
            } else {
                if (!formData[key]) {
                    alert("Please fill in all the fields.");
                    return;
                }
                formDataToSubmit.append(key, formData[key]);
            }
        }

        try {
            /* const response = id
                ? await editCar(formDataToSubmit, id)
                : await sellCar(formDataToSubmit); */

            if (true) {
                alert("Car added successfully!");
                setFormData({
                    title: "",
                    description: "",
                    brand: "",
                    model: "",
                    year: "",
                    price: "",
                    rentPrice: "",
                    isAvailableForRent: false,
                    isAvailableForSale: false,
                    fuelType: "Petrol",
                    mileage: "",
                    transmission: "Manual",
                    location: {
                        city: "",
                        state: "",
                        country: "",
                        zipCode: "",
                    },
                    image: null,
                });
            } else {
                alert("Failed to add car.");
            }
        } catch (error) {
            console.error("Error adding car:", error);
            alert("An error occurred.");
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (id) {
            const fetchCarDetails = async () => {
                try {
                    const response = await fetch(
                        `${API_URL_EWS}/api/cars/get/${id}`
                    );
                    const data = await response.json();

                    for (let key in formData) {
                        if (key === "location") {
                            for (const locKey in formData.location) {
                                setFormData((prev) => ({
                                    ...prev,
                                    location: {
                                        ...prev.location,
                                        [locKey]: data.data.location[locKey],
                                    },
                                }));
                            }
                        } else if (key === "image") {
                            continue;
                        } else {
                            setFormData((prev) => ({
                                ...prev,
                                [key]: data.data[key],
                            }));
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            fetchCarDetails();
        }
    }, [id]);

    return (
        <div>
            <div className="p-4 flex flex-col gap-4">
                {!id ? (
                    <h1
                        style={{
                            fontFamily: "SuperBrigadeTitle",
                            letterSpacing: "-0.2rem",
                        }}
                        className="text-2xl md:text-5xl text-center py-8 col-div-1 md:col-div-3 uppercase"
                    >
                        Add A New Car
                    </h1>
                ) : (
                    <h1
                        style={{
                            fontFamily: "SuperBrigadeTitle",
                            letterSpacing: "-0.2rem",
                        }}
                        className="text-2xl md:text-5xl text-center py-8 col-div-1 md:col-div-3 uppercase"
                    >
                        Edit Car Details
                    </h1>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="flex flex-col gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <button
                            type="button"
                            className="font-bold bg-black text-white p-4 rounded-md"
                            onClick={handleUploadClick}
                        >
                            Upload Image
                        </button>

                        {formData.imageError && (
                            <p className="text-red-500 mt-2">
                                {formData.imageError}
                            </p>
                        )}

                        {formData.image && !formData.imageError && (
                            <div className="mt-4">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Uploaded Preview"
                                    className="w-full h-auto"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <form className="w-full" onSubmit={handleFormSubmit}>
                            <table className="table-fixed w-full border-collapse border border-gray-300 shadow-lg">
                                <thead
                                    style={{
                                        fontFamily: "SuperBrigadeCondensed",
                                        letterSpacing: "0.1rem",
                                    }}
                                >
                                    <tr className="bg-black text-white">
                                        <th className="p-4 w-1/2 md:w-1/4 text-left">
                                            Attribute
                                        </th>
                                        <th className="p-4 w-3/4 text-left">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontFamily: "Montserrat" }}>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Title
                                        </td>
                                        <td className="border p-4">
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Description
                                        </td>
                                        <td className="border p-4">
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Brand
                                        </td>
                                        <td className="border p-4">
                                            <input
                                                type="text"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Model
                                        </td>
                                        <td className="border p-4">
                                            <input
                                                type="text"
                                                name="model"
                                                value={formData.model}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Year
                                        </td>
                                        <td className="border p-4">
                                            <input
                                                type="number"
                                                name="year"
                                                value={formData.year}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Available For Sale
                                        </td>
                                        <td className="border p-4">
                                            <select
                                                name="isAvailableForSale"
                                                value={
                                                    formData.isAvailableForSale
                                                        ? "true"
                                                        : "false"
                                                }
                                                onChange={handleRadioChange}
                                                className="w-full border p-2"
                                            >
                                                <option value="true">
                                                    Yes
                                                </option>
                                                <option value="false">
                                                    No
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {formData.isAvailableForSale && (
                                        <tr>
                                            <td className="border p-4 font-semibold">
                                                Price
                                            </td>
                                            <td className="border p-4">
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    className="w-full border p-2"
                                                />
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Available For Rent
                                        </td>
                                        <td className="border p-4">
                                            <select
                                                name="isAvailableForRent"
                                                value={
                                                    formData.isAvailableForRent
                                                        ? "true"
                                                        : "false"
                                                }
                                                onChange={handleRadioChange}
                                                className="w-full border p-2"
                                            >
                                                <option value="true">
                                                    Yes
                                                </option>
                                                <option value="false">
                                                    No
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    {formData.isAvailableForRent && (
                                        <tr>
                                            <td className="border p-4 font-semibold">
                                                Rent Price
                                            </td>
                                            <td className="border p-4">
                                                <input
                                                    type="number"
                                                    name="rentPrice"
                                                    value={formData.rentPrice}
                                                    onChange={handleInputChange}
                                                    className="w-full border p-2"
                                                />
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Fuel Type
                                        </td>
                                        <td className="border p-4">
                                            <select
                                                name="fuelType"
                                                value={formData.fuelType}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            >
                                                <option value="Petrol">
                                                    Petrol
                                                </option>
                                                <option value="Diesel">
                                                    Diesel
                                                </option>
                                                <option value="Electric">
                                                    Electric
                                                </option>
                                                <option value="Hybrid">
                                                    Hybrid
                                                </option>
                                                <option value="CNG">CNG</option>
                                                <option value="LPG">LPG</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Mileage
                                        </td>
                                        <td className="border p-4">
                                            <input
                                                type="number"
                                                name="mileage"
                                                value={formData.mileage}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Transmission
                                        </td>
                                        <td className="border p-4">
                                            <select
                                                name="transmission"
                                                value={formData.transmission}
                                                onChange={handleInputChange}
                                                className="w-full border p-2"
                                            >
                                                <option value="Manual">
                                                    Manual
                                                </option>
                                                <option value="Automatic">
                                                    Automatic
                                                </option>
                                                <option value="Semi-Automatic">
                                                    Semi-Automatic
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-4 font-semibold">
                                            Location
                                        </td>
                                        <td className="border p-4">
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    name="location.city"
                                                    placeholder="City"
                                                    value={
                                                        formData.location.city
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full border p-2"
                                                />
                                                <input
                                                    type="text"
                                                    name="location.state"
                                                    placeholder="State"
                                                    value={
                                                        formData.location.state
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full border p-2"
                                                />
                                                <input
                                                    type="text"
                                                    name="location.country"
                                                    placeholder="Country"
                                                    value={
                                                        formData.location
                                                            .country
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full border p-2"
                                                />
                                                <input
                                                    type="text"
                                                    name="location.zipCode"
                                                    placeholder="Zip Code"
                                                    value={
                                                        formData.location
                                                            .zipCode
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full border p-2"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                type="submit"
                                className="font-bold bg-blue-600 text-white p-4 rounded-md mt-4 w-full"
                            >
                                Add Car
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sell;
