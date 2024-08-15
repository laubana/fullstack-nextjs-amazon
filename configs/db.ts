import mongoose from "mongoose";

import "@/models/Cart";
import "@/models/Category";
import "@/models/Posting";
import "@/models/Price";
import "@/models/Product";
import "@/models/Purchase";
import "@/models/Refund";
import "@/models/Transaction";
import "@/models/User";

export default async () => {
  try {
    mongoose.set("strictQuery", false);

    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
    } else {
      console.error("DB not connected.");
    }
  } catch (error) {
    console.error(error);
  }
};
