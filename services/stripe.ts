"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import db from "@/configs/db";
import { createSetupIntent, listPaymentMethods } from "@/helpers/stripe";
import User from "@/models/User";

export const addSetupIntent = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const setupIntent = await createSetupIntent({
      customerId: user.customerId,
    });

    return {
      message: "Setup intent created successfully.",
      data: JSON.parse(JSON.stringify(setupIntent)),
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

export const getAllPaymentMethods = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const paymentMethods = await listPaymentMethods({
      customerId: user.customerId,
    });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(paymentMethods)),
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
