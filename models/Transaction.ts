import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const TransactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: [true, "TransactionId is required."],
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
