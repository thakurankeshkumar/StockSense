import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Location from "@/models/Location";
import Warehouse from "@/models/Warehouse";

export async function POST(request) {
  try {
    await connectDB();

    const { name, warehouseId } = await request.json();

    if (!name?.trim() || !warehouseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Location name and warehouse are required",
        },
        { status: 400 }
      );
    }

    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
      return NextResponse.json(
        {
          success: false,
          message: "Warehouse not found",
        },
        { status: 404 }
      );
    }

    const existingLocation = await Location.findOne({
      name: name.trim(),
      warehouseId,
    });

    if (existingLocation) {
      return NextResponse.json(
        {
          success: false,
          message: "Location already exists in this warehouse",
        },
        { status: 409 }
      );
    }

    const location = await Location.create({
      name: name.trim(),
      warehouseId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Location created successfully",
        data: location,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create location error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create location",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const locations = await Location.find()
      .populate("warehouseId", "name address")
      .sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error("Get locations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch locations",
      },
      { status: 500 }
    );
  }
}