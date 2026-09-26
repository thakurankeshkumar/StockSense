import mongoose from "mongoose";

const receiptItemSchema = new mongoose.Schema(
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

const receiptSchema = new mongoose.Schema(
    {
        supplier: {
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
            type: [receiptItemSchema],
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Receipt must contain at least one item",
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

const Receipt = mongoose.models.Receipt || mongoose.model("Receipt", receiptSchema);

export default Receipt;