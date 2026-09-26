import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Delivery from "@/models/Delivery";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { customer, locationId, items, createdBy } = body;

    if (!customer || !locationId || !items?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer, location and items are required",
        },
        { status: 400 }
      );
    }

    const delivery = await Delivery.create({
      customer,
      locationId,
      items,
      createdBy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Delivery created successfully",
        data: delivery,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create delivery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create delivery",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const deliveries = await Delivery.find()
      .populate("locationId", "name")
      .populate("items.productId", "name sku unit")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: deliveries,
    });
  } catch (error) {
    console.error("Get deliveries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch deliveries",
      },
      { status: 500 }
    );
  }
}