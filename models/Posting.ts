import { model, models, Schema } from "mongoose";

import { DB } from "@/const/db";

const PostingSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: DB.Category,
      required: [true, "Category is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
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

export default models[DB.Posting] || model(DB.Posting, PostingSchema);
