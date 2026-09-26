import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    type: {
        type: String,
        enum: ["RECEIPT", "DELIVERY", "TRANSFER", "ADJUSTMENT"],
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        min: 0,
    },

    fromLocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    },

    toLocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    },

    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true, }
);

const StockMovement = mongoose.models.StockMovement || mongoose.model("StockMovement", stockMovementSchema);

export default StockMovement;