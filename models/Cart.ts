import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const CartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: DB.Product,
      required: [true, "Product is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
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

export default models[DB.Cart] || model(DB.Cart, CartSchema);
