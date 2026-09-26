import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Adjustment from "@/models/Adjustment";
import StockMovement from "@/models/StockMovement";
import { adjustStock } from "@/lib/services/stock.service";

export async function POST(request, { params }) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid adjustment ID",
        },
        { status: 400 }
      );
    }

    let validatedAdjustment;

    await session.withTransaction(async () => {
      const adjustment = await Adjustment.findById(id).session(session);

      if (!adjustment) {
        throw new Error("Adjustment not found");
      }

      if (adjustment.status === "DONE") {
        throw new Error("Adjustment is already validated");
      }

      if (adjustment.status === "CANCELED") {
        throw new Error("Canceled adjustment cannot be validated");
      }

      await adjustStock({
        productId: adjustment.productId,
        locationId: adjustment.locationId,
        countedQuantity: adjustment.countedQuantity,
        session,
      });

      if (adjustment.difference !== 0) {
        await StockMovement.create(
          [
            {
              productId: adjustment.productId,
              type: "ADJUSTMENT",
              quantity: Math.abs(adjustment.difference),
              fromLocationId:
                adjustment.difference < 0
                  ? adjustment.locationId
                  : undefined,
              toLocationId:
                adjustment.difference > 0
                  ? adjustment.locationId
                  : undefined,
              referenceId: adjustment._id,
              createdBy: adjustment.createdBy,
            },
          ],
          { session }
        );
      }

      adjustment.status = "DONE";
      await adjustment.save({ session });

      validatedAdjustment = adjustment;
    });

    return NextResponse.json({
      success: true,
      message: "Adjustment validated and stock updated successfully",
      data: validatedAdjustment,
    });
  } catch (error) {
    console.error("Validate adjustment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to validate adjustment",
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}