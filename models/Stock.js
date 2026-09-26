import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
},
    {
        timestamps: true,
    }
);

stockSchema.index(
    { productId: 1, locationId: 1 },
    { unique: true }
);

const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

export default Stock;