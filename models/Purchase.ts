import { model, models, Schema } from "mongoose";

import { DB } from "@/const/db";

const PurchaseSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: DB.User,
      required: [true, "Buyer is required."],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: DB.Product,
      required: [true, "Product is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    refund: {
      type: Schema.Types.ObjectId,
      ref: DB.Refund,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: DB.User,
      required: [true, "Seller is required."],
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: DB.Transaction,
      required: [true, "Transaction is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Purchase] || model(DB.Purchase, PurchaseSchema);
