import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const VariantSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: DB.Category,
      required: [true, "Category is required."],
    },
    images: {
      type: [String],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    price: {
      type: Schema.Types.ObjectId,
      ref: DB.Price,
      required: [true, "Price is required."],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: DB.Product,
      required: [true, "Product is required."],
    },
    productId: {
      type: String,
      required: [true, "ProductId is required."],
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

export default models[DB.Variant] || model(DB.Variant, VariantSchema);
