import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Adjustment from "@/models/Adjustment";
import Stock from "@/models/Stock";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      productId,
      locationId,
      countedQuantity,
      reason,
      createdBy,
    } = body;

    if (
      !productId ||
      !locationId ||
      countedQuantity === undefined ||
      countedQuantity === null
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Product, location and counted quantity are required",
        },
        { status: 400 }
      );
    }

    if (countedQuantity < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Counted quantity cannot be negative",
        },
        { status: 400 }
      );
    }

    const stock = await Stock.findOne({
      productId,
      locationId,
    });

    const systemQuantity = stock?.quantity || 0;
    const difference = countedQuantity - systemQuantity;

    const adjustment = await Adjustment.create({
      productId,
      locationId,
      systemQuantity,
      countedQuantity,
      difference,
      reason,
      createdBy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Adjustment created successfully",
        data: adjustment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create adjustment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create adjustment",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const adjustments = await Adjustment.find()
      .populate("productId", "name sku unit")
      .populate("locationId", "name warehouseId")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: adjustments,
    });
  } catch (error) {
    console.error("Get adjustments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch adjustments",
      },
      { status: 500 }
    );
  }
}