import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Delivery from "@/models/Delivery";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid delivery ID",
        },
        { status: 400 }
      );
    }

    const delivery = await Delivery.findById(id)
      .populate("locationId", "name warehouseId")
      .populate("items.productId", "name sku unit");

    if (!delivery) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    console.error("Get delivery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch delivery",
      },
      { status: 500 }
    );
  }
}