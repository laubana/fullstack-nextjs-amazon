import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const TransactionSchema = new Schema(
  {
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
