import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Transfer from "@/models/Transfer";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      fromLocationId,
      toLocationId,
      items,
      createdBy,
    } = body;

    if (!fromLocationId || !toLocationId || !items?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Source, destination and items are required",
        },
        { status: 400 }
      );
    }

    if (String(fromLocationId) === String(toLocationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Source and destination locations must be different",
        },
        { status: 400 }
      );
    }

    const transfer = await Transfer.create({
      fromLocationId,
      toLocationId,
      items,
      createdBy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transfer created successfully",
        data: transfer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create transfer error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create transfer",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const transfers = await Transfer.find()
      .populate("fromLocationId", "name warehouseId")
      .populate("toLocationId", "name warehouseId")
      .populate("items.productId", "name sku unit")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: transfers,
    });
  } catch (error) {
    console.error("Get transfers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transfers",
      },
      { status: 500 }
    );
  }
}