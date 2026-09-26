import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Location from "@/models/Location";
import Stock from "@/models/Stock";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid location ID",
        },
        { status: 400 }
      );
    }

    const location = await Location.findById(id).populate(
      "warehouseId",
      "name address"
    );

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: "Location not found",
        },
        { status: 404 }
      );
    }

    const stock = await Stock.find({
      locationId: id,
    }).populate("productId", "name sku unit reorderLevel");

    return NextResponse.json({
      success: true,
      data: {
        location,
        stock,
      },
    });
  } catch (error) {
    console.error("Get location error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch location",
      },
      { status: 500 }
    );
  }
}