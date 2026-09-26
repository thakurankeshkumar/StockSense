import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Stock from "@/models/Stock";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).populate(
      "categoryId",
      "name"
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const stock = await Stock.find({ productId: id }).populate(
      "locationId",
      "name warehouseId"
    );

    return NextResponse.json({
      success: true,
      data: {
        product,
        stock,
      },
    });
  } catch (error) {
    console.error("Get product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      name,
      sku,
      categoryId,
      unit,
      reorderLevel,
    } = body;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    if (categoryId) {
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

      product.categoryId = categoryId;
    }

    if (sku) {
      const normalizedSku = sku.trim().toUpperCase();

      const existingProduct = await Product.findOne({
        sku: normalizedSku,
        _id: { $ne: id },
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

      product.sku = normalizedSku;
    }

    if (name !== undefined) {
      product.name = name.trim();
    }

    if (unit !== undefined) {
      product.unit = unit.trim();
    }

    if (reorderLevel !== undefined) {
      if (reorderLevel < 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Reorder level cannot be negative",
          },
          { status: 400 }
        );
      }

      product.reorderLevel = reorderLevel;
    }

    await product.save();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update product",
      },
      { status: 500 }
    );
  }
}