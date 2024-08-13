"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import db from "@/configs/db";
import Product from "@/models/Product";
import Purchase from "@/models/Purchase";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export const addPurchase = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const paymentIntentId = props.get("paymentIntentId") as string;
    const productId = props.get("productId") as string;
    const quantity = props.get("quantity") as string;
    const transactionId = props.get("transactionId") as string;
    const userId = session?.user?.id;

    if (!paymentIntentId || !productId || !quantity) {
      return { message: "Invalid Input", ok: false };
    }

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const product = await Product.findById(productId);

    if (!product) {
      return { message: "No product found.", ok: false };
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return { message: "No transaction found.", ok: false };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const purchase = await Purchase.create({
      paymentIntentId,
      product: productId,
      quantity: +quantity,
      transaction: transactionId,
    });

    return {
      message: "Purchase created successfully.",
      data: JSON.parse(JSON.stringify(purchase)),
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
