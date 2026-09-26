import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Warehouse from "@/models/Warehouse";

export async function POST(request) {
  try {
    await connectDB();

    const { name, address } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Warehouse name is required",
        },
        { status: 400 }
      );
    }

    const existingWarehouse = await Warehouse.findOne({
      name: name.trim(),
    });

    if (existingWarehouse) {
      return NextResponse.json(
        {
          success: false,
          message: "Warehouse already exists",
        },
        { status: 409 }
      );
    }

    const warehouse = await Warehouse.create({
      name: name.trim(),
      address: address?.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Warehouse created successfully",
        data: warehouse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create warehouse error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create warehouse",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const warehouses = await Warehouse.find().sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: warehouses,
    });
  } catch (error) {
    console.error("Get warehouses error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch warehouses",
      },
      { status: 500 }
    );
  }
}