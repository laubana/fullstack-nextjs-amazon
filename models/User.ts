import { model, models, Schema } from "mongoose";
import { DB } from "@/const/db";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exsits."],
      required: [true, "Email is required."],
    },
    image: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models[DB.User] || model(DB.User, UserSchema);
