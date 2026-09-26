import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Delivery from "@/models/Delivery";
import StockMovement from "@/models/StockMovement";
import { decreaseStock } from "@/lib/services/stock.service";

export async function POST(request, { params }) {
  const session = await mongoose.startSession();

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

    let validatedDelivery;

    await session.withTransaction(async () => {
      const delivery = await Delivery.findById(id).session(session);

      if (!delivery) {
        throw new Error("Delivery not found");
      }

      if (delivery.status === "DONE") {
        throw new Error("Delivery is already validated");
      }

      if (delivery.status === "CANCELED") {
        throw new Error("Canceled delivery cannot be validated");
      }

      if (delivery.status !== "READY") {
        throw new Error("Delivery must be packed before validation");
      }

      for (const item of delivery.items) {
        await decreaseStock({
          productId: item.productId,
          locationId: delivery.locationId,
          quantity: item.quantity,
          session,
        });

        await StockMovement.create(
          [
            {
              productId: item.productId,
              type: "DELIVERY",
              quantity: item.quantity,
              fromLocationId: delivery.locationId,
              referenceId: delivery._id,
              createdBy: delivery.createdBy,
            },
          ],
          { session }
        );
      }

      delivery.status = "DONE";
      await delivery.save({ session });

      validatedDelivery = delivery;
    });

    return NextResponse.json({
      success: true,
      message: "Delivery validated and stock updated successfully",
      data: validatedDelivery,
    });
  } catch (error) {
    console.error("Validate delivery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to validate delivery",
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}