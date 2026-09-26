import Stock from "@/models/Stock";


export async function increaseStock({
  productId,
  locationId,
  quantity,
  session,
}) {
  if (!quantity || quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const stock = await Stock.findOneAndUpdate(
    { productId, locationId },
    { $inc: { quantity } },
    { new: true, upsert: true, session }
  );

  return stock;
}

export async function decreaseStock({
  productId,
  locationId,
  quantity,
  session,
}) {
  if (!quantity || quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const stock = await Stock.findOne({
    productId,
    locationId,
  }).session(session);

  if (!stock) {
    throw new Error("No stock found at this location");
  }

  if (stock.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  stock.quantity -= quantity;
  await stock.save({ session });

  return stock;
}

export async function transferStock({
  productId,
  fromLocationId,
  toLocationId,
  quantity,
  session,
}) {
  if (String(fromLocationId) === String(toLocationId)) {
    throw new Error(
      "Source and destination locations must be different"
    );
  }

  await decreaseStock({
    productId,
    locationId: fromLocationId,
    quantity,
    session,
  });

  const destinationStock = await increaseStock({
    productId,
    locationId: toLocationId,
    quantity,
    session,
  });

  return destinationStock;
}

export async function adjustStock({
  productId,
  locationId,
  countedQuantity,
  session,
}) {
  if (countedQuantity < 0) {
    throw new Error("Counted quantity cannot be negative");
  }

  const stock = await Stock.findOneAndUpdate(
    {
      productId,
      locationId,
    },
    {
      $set: { quantity: countedQuantity },
    },
    {
      new: true,
      upsert: true,
      session,
    }
  );

  return stock;
}