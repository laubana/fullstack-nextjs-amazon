import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const PriceSchema = new Schema(
  {
    value: {
      type: Number,
      required: [true, "Value is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Price] || model(DB.Price, PriceSchema);
