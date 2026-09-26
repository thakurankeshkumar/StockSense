import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Transfer from "@/models/Transfer";
import StockMovement from "@/models/StockMovement";
import { transferStock } from "@/lib/services/stock.service";

export async function POST(request, { params }) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transfer ID",
        },
        { status: 400 }
      );
    }

    let validatedTransfer;

    await session.withTransaction(async () => {
      const transfer = await Transfer.findById(id).session(session);

      if (!transfer) {
        throw new Error("Transfer not found");
      }

      if (transfer.status === "DONE") {
        throw new Error("Transfer is already validated");
      }

      if (transfer.status === "CANCELED") {
        throw new Error("Canceled transfer cannot be validated");
      }

      for (const item of transfer.items) {
        await transferStock({
          productId: item.productId,
          fromLocationId: transfer.fromLocationId,
          toLocationId: transfer.toLocationId,
          quantity: item.quantity,
          session,
        });

        await StockMovement.create(
          [
            {
              productId: item.productId,
              type: "TRANSFER",
              quantity: item.quantity,
              fromLocationId: transfer.fromLocationId,
              toLocationId: transfer.toLocationId,
              referenceId: transfer._id,
              createdBy: transfer.createdBy,
            },
          ],
          { session }
        );
      }

      transfer.status = "DONE";
      await transfer.save({ session });

      validatedTransfer = transfer;
    });

    return NextResponse.json({
      success: true,
      message: "Transfer validated and stock moved successfully",
      data: validatedTransfer,
    });
  } catch (error) {
    console.error("Validate transfer error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to validate transfer",
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}