import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const PurchaseSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: DB.Transaction,
      required: [true, "Transaction is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: DB.User,
      required: [true, "User is required."],
    },
    variant: {
      type: Schema.Types.ObjectId,
      ref: DB.Variant,
      required: [true, "Variant is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Purchase] || model(DB.Purchase, PurchaseSchema);
