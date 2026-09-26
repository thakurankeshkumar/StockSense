import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Receipt from "@/models/Receipt";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid receipt ID",
        },
        { status: 400 }
      );
    }

    const receipt = await Receipt.findById(id)
      .populate("locationId", "name warehouseId")
      .populate("items.productId", "name sku unit");

    if (!receipt) {
      return NextResponse.json(
        {
          success: false,
          message: "Receipt not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.error("Get receipt error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch receipt",
      },
      { status: 500 }
    );
  }
}