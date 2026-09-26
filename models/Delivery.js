import mongoose from "mongoose";

const deliveryItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
    },
    { _id: false }
);

const deliverySchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: true,
            trim: true,
        },

        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true,
        },

        items: {
            type: [deliveryItemSchema],
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Delivery must contain at least one item",
            },
        },

        status: {
            type: String,
            enum: ["DRAFT", "WAITING", "READY", "DONE", "CANCELED"],
            default: "DRAFT",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Delivery = mongoose.models.Delivery || mongoose.model("Delivery", deliverySchema);

export default Delivery;