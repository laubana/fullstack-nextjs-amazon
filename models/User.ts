import { model, models, Schema } from "mongoose";

import { DB } from "@/const/db";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exsits."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "Role is required."],
      enum: ["user", "admin"],
      default: "user",
    },
    customerId: {
      type: String,
      required: [true, "CustomerId is required."],
      unique: [true, "CustomerId already exsits."],
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.User] || model(DB.User, UserSchema);
