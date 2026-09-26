import mongoose from "mongoose";

const adjustmentSchema = new mongoose.Schema(
  {
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

    systemQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    countedQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    difference: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "DONE", "CANCELED"],
      default: "DRAFT",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Adjustment =
  mongoose.models.Adjustment ||
  mongoose.model("Adjustment", adjustmentSchema);

export default Adjustment;