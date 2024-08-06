import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const ProductSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: DB.Category,
      required: [true, "Category is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
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

export default models[DB.Product] || model(DB.Product, ProductSchema);
