import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
}, { timestamps: true, }
);

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;