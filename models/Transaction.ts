import { model, models, Schema } from "mongoose";

import { DB } from "@/const/db";

const TransactionSchema = new Schema(
  {
    paymentIntentId: {
      type: String,
      required: [true, "PaymentIntentId is required."],
    },
    paymentMethodId: {
      type: String,
      required: [true, "paymentMethodId is required."],
    },
    postings: {
      type: [Schema.Types.ObjectId],
      ref: DB.Posting,
      required: [true, "Postings is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: DB.User,
      required: [true, "User is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Transaction] ||
  model(DB.Transaction, TransactionSchema);
