"use server";

import bcryptjs from "bcryptjs";
import db from "@/configs/db";
import { createCustomer } from "@/helpers/stripe";
import User from "@/models/User";

export const signUp = async (props: FormData) => {
  try {
    const email = props.get("email") as string;
    const name = props.get("name") as string;
    const password = props.get("password") as string;

    if (!email || !name || !password) {
      return { message: "Invalid Input", ok: false };
    }

    await db();

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return { message: "The email already exists.", ok: false };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const customer = await createCustomer({ name, email });

    await User.create({
      customerId: customer.id,
      email,
      name,
      password: hashedPassword,
    });

    return { message: "User created successfully.", ok: true };
  } catch (error) {
    console.error(error);

    return { message: "Server Error!", ok: false };
  }
};
