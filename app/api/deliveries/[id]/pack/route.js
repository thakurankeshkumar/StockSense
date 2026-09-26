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

    if (delivery.status !== "WAITING") {
      return NextResponse.json(
        {
          success: false,
          message: `Delivery cannot be packed from ${delivery.status} status`,
        },
        { status: 400 }
      );
    }

    delivery.status = "READY";
    await delivery.save();

    return NextResponse.json({
      success: true,
      message: "Delivery packed successfully",
      data: delivery,
    });
  } catch (error) {
    console.error("Pack delivery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to pack delivery",
      },
      { status: 500 }
    );
  }
}