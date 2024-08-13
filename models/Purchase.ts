import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const PurchaseSchema = new Schema(
  {
    paymentIntentId: {
      type: String,
      required: [true, "PaymentIntentId is required."],
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
