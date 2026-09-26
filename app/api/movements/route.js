import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import StockMovement from "@/models/StockMovement";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const productId = searchParams.get("productId");
    const type = searchParams.get("type");
    const fromLocationId = searchParams.get("fromLocationId");
    const toLocationId = searchParams.get("toLocationId");

    const filter = {};

    if (productId) filter.productId = productId;
    if (type) filter.type = type;
    if (fromLocationId) filter.fromLocationId = fromLocationId;
    if (toLocationId) filter.toLocationId = toLocationId;

    const movements = await StockMovement.find(filter)
      .populate("productId", "name sku unit")
      .populate("fromLocationId", "name")
      .populate("toLocationId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: movements,
    });
  } catch (error) {
    console.error("Get movements error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stock movements",
      },
      { status: 500 }
    );
  }
}