"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";
import db from "@/configs/db";

import Price from "@/models/Price";
import User from "@/models/User";

export const addPrice = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const value = props.get("value") as string;
    const userId = session?.user?.id;

    if (!value) {
      return { message: "Invalid Input", ok: false };
    }

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const price = await Price.create({ value: +value });

    return {
      message: "Price created successfully.",
      data: JSON.parse(JSON.stringify(price)),
      ok: true,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Server Error!",
      ok: false,
    };
  }
};
