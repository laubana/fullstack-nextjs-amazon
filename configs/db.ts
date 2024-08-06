import mongoose from "mongoose";

export default async () => {
  try {
    mongoose.set("strictQuery", true);

    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("DB connected.");
    } else {
      console.log("DB not connected.");
    }
  } catch (error) {
    console.error(error);
  }
};
