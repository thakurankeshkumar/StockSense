import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        unit: {
            type: String,
            required: true,
            trim: true,
        },

        reorderLevel: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true, }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;