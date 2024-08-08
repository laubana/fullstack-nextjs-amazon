import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const UserSchema = new Schema(
  {
    email: {
      required: [true, "Email is required."],
      type: String,
      unique: [true, "Email already exsits."],
    },
    name: {
      required: [true, "Name is required."],
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      default: "user",
      enum: ["user", "admin"],
      required: [true, "Role is required."],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.User] || model(DB.User, UserSchema);
