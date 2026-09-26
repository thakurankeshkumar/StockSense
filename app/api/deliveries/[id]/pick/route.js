import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Delivery from "@/models/Delivery";

export async function POST(request, { params }) {
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

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery not found",
        },
        { status: 404 }
      );
    }

    if (delivery.status !== "DRAFT") {
      return NextResponse.json(
        {
          success: false,
          message: `Delivery cannot be picked from ${delivery.status} status`,
        },
        { status: 400 }
      );
    }

    delivery.status = "WAITING";
    await delivery.save();

    return NextResponse.json({
      success: true,
      message: "Delivery picked successfully",
      data: delivery,
    });
  } catch (error) {
    console.error("Pick delivery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to pick delivery",
      },
      { status: 500 }
    );
  }
}