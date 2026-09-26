import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Receipt from "@/models/Receipt";
import StockMovement from "@/models/StockMovement";
import { increaseStock } from "@/lib/services/stock.service";

export async function POST(request, { params }) {
    const session = await mongoose.startSession();

    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid receipt ID",
                },
                { status: 400 }
            );
        }

        let validatedReceipt;

        await session.withTransaction(async () => {
            const receipt = await Receipt.findById(id).session(session);

            if (!receipt) {
                throw new Error("Receipt not found");
            }

            if (receipt.status === "DONE") {
                throw new Error("Receipt is already validated");
            }

            if (receipt.status === "CANCELED") {
                throw new Error("Canceled receipt cannot be validated");
            }

            for (const item of receipt.items) {
                await increaseStock({
                    productId: item.productId,
                    locationId: receipt.locationId,
                    quantity: item.quantity,
                    session,
                });

                await StockMovement.create(
                    [
                        {
                            productId: item.productId,
                            type: "RECEIPT",
                            quantity: item.quantity,
                            toLocationId: receipt.locationId,
                            referenceId: receipt._id,
                            createdBy: receipt.createdBy,
                        },
                    ],
                    { session }
                );
            }

            receipt.status = "DONE";
            await receipt.save({ session });

            validatedReceipt = receipt;
        });

        return NextResponse.json({
            success: true,
            message: "Receipt validated and stock updated successfully",
            data: validatedReceipt,
        });
    } catch (error) {
        console.error("Validate receipt error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to validate receipt",
            },
            { status: 500 }
        );
    } finally {
        await session.endSession();
    }
}