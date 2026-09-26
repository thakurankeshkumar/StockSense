import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Receipt from "@/models/Receipt";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { supplier, locationId, items, createdBy } = body;

    if (!supplier || !locationId || !items?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Supplier, location and items are required",
        },
        { status: 400 }
      );
    }

    const receipt = await Receipt.create({
      supplier,
      locationId,
      items,
      createdBy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Receipt created successfully",
        data: receipt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create receipt error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create receipt",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const receipts = await Receipt.find()
      .populate("locationId", "name")
      .populate("items.productId", "name sku unit")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: receipts,
    });
  } catch (error) {
    console.error("Get receipts error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch receipts",
      },
      { status: 500 }
    );
  }
}