import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Stock from "@/models/Stock";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      sku,
      categoryId,
      unit,
      reorderLevel,
      initialStock,
      initialStockLocationId,
    } = body;

    if (!name || !sku || !categoryId || !unit) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, SKU, category and unit are required",
        },
        { status: 400 }
      );
    }

    if (initialStock !== undefined && initialStock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Initial stock cannot be negative",
        },
        { status: 400 }
      );
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      );
    }

    if (
      initialStock !== undefined &&
      initialStock > 0 &&
      !initialStockLocationId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Location is required when initial stock is provided",
        },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({
      sku: sku.trim().toUpperCase(),
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "SKU already exists",
        },
        { status: 409 }
      );
    }

    const product = await Product.create({
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      categoryId,
      unit: unit.trim(),
      reorderLevel: reorderLevel ?? 0,
    });

    // Initial stock is stored separately because stock is location-specific.
    if (initialStock !== undefined && initialStock > 0) {
      await Stock.create({
        productId: product._id,
        locationId: initialStockLocationId,
        quantity: initialStock,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create product",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}