import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Warehouse from "@/models/Warehouse";
import Location from "@/models/Location";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid warehouse ID",
        },
        { status: 400 }
      );
    }

    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
      return NextResponse.json(
        {
          success: false,
          message: "Warehouse not found",
        },
        { status: 404 }
      );
    }

    const locations = await Location.find({
      warehouseId: id,
    }).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: {
        warehouse,
        locations,
      },
    });
  } catch (error) {
    console.error("Get warehouse error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch warehouse",
      },
      { status: 500 }
    );
  }
}