"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";
import db from "@/configs/db";

import Refund from "@/models/Refund";
import User from "@/models/User";

export const addRefund = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const quantity = props.get("quantity") as string;
    const userId = session?.user?.id;

    if (!quantity) {
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

    const refund = await Refund.create({
      quantity: +quantity,
    });

    return {
      message: "Refund created successfully.",
      data: JSON.parse(JSON.stringify(refund)),
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
