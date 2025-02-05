import { model, models, Schema } from "mongoose";

import { DB } from "@/const/db";

const RefundSchema = new Schema(
  {
    isApproved: {
      type: Boolean,
      required: [true, "IsApproved is required."],
      default: false,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    refundId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Refund] || model(DB.Refund, RefundSchema);
