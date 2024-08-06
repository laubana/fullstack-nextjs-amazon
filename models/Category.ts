import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.Category] || model(DB.Category, CategorySchema);
