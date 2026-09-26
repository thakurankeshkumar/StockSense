import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Stock from "@/models/Stock";
import Receipt from "@/models/Receipt";
import Delivery from "@/models/Delivery";
import Transfer from "@/models/Transfer";

export async function GET() {
  try {
    await connectDB();

    const [
      products,
      stock,
      pendingReceipts,
      pendingDeliveries,
      pendingTransfers,
    ] = await Promise.all([
      Product.find()
        .select("name sku unit reorderLevel categoryId")
        .populate("categoryId", "name"),

      Stock.find()
        .populate("productId", "name sku unit reorderLevel categoryId")
        .populate("locationId", "name warehouseId"),

      Receipt.countDocuments({
        status: { $ne: "DONE" },
      }),

      Delivery.countDocuments({
        status: { $ne: "DONE" },
      }),

      Transfer.countDocuments({
        status: { $ne: "DONE" },
      }),
    ]);

    const stockMap = new Map();

    for (const item of stock) {
      const productId = String(item.productId._id);

      if (!stockMap.has(productId)) {
        stockMap.set(productId, {
          product: item.productId,
          quantity: 0,
        });
      }

      stockMap.get(productId).quantity += item.quantity;
    }

    let totalQuantity = 0;
    let lowStockItems = 0;
    let outOfStockItems = 0;

    for (const product of products) {
      const productStock = stockMap.get(String(product._id));

      const quantity = productStock?.quantity || 0;

      totalQuantity += quantity;

      if (quantity === 0) {
        outOfStockItems++;
      } else if (quantity <= product.reorderLevel) {
        lowStockItems++;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalProducts: products.length,
        totalQuantity,
        lowStockItems,
        outOfStockItems,
        pendingReceipts,
        pendingDeliveries,
        pendingTransfers,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}