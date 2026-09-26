import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Stock from "@/models/Stock";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const productId = searchParams.get("productId");
    const locationId = searchParams.get("locationId");

    const filter = {};

    if (productId) filter.productId = productId;
    if (locationId) filter.locationId = locationId;

    const stock = await Stock.find(filter)
      .populate("productId", "name sku unit reorderLevel")
      .populate("locationId", "name warehouseId")
      .sort({ updatedAt: -1 });

    return NextResponse.json({
      success: true,
      data: stock,
    });
  } catch (error) {
    console.error("Get stock error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stock",
      },
      { status: 500 }
    );
  }
}