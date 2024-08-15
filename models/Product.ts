import { model, models, Schema } from "mongoose";

import { DB } from "@/const/db";

const ProductSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    images: {
      type: [String],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    posting: {
      type: Schema.Types.ObjectId,
      ref: DB.Posting,
      required: [true, "Posting is required."],
    },
    price: {
      type: Schema.Types.ObjectId,
      ref: DB.Price,
      required: [true, "Price is required."],
    },
    productId: {
      type: String,
      required: [true, "ProductId is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Product] || model(DB.Product, ProductSchema);
