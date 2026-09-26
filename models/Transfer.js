import mongoose from "mongoose";

const transferItemSchema = new mongoose.Schema(
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

const transferSchema = new mongoose.Schema(
    {
        fromLocationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true,
        },

        toLocationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true,
        },

        items: {
            type: [transferItemSchema],
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Transfer must contain at least one item",
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

const Transfer = mongoose.models.Transfer || mongoose.model("Transfer", transferSchema);

export default Transfer;