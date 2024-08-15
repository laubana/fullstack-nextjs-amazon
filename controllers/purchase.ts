"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";
import db from "@/configs/db";

import { DB } from "@/const/db";

import Purchase from "@/models/Purchase";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export const getBuyerPurchases = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const transactionId = props.get("transactionId") as string;
    const userId = session?.user?.id;

    if (!transactionId) {
      return { message: "Invalid Input", ok: false };
    }

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return { message: "No transaction found.", ok: false };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const purchases = await Purchase.find({
      buyer: userId,
      transaction: transactionId,
    })
      .populate({
        path: DB.Product,
        populate: [
          { path: DB.Posting },
          {
            path: DB.Price,
          },
        ],
      })
      .populate({
        path: DB.Refund,
      })
      .populate({
        path: DB.Transaction,
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(purchases)),
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

export const getSellerPurchases = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const transactionId = props.get("transactionId") as string;
    const userId = session?.user?.id;

    if (!transactionId) {
      return { message: "Invalid Input", ok: false };
    }

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return { message: "No transaction found.", ok: false };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const purchases = await Purchase.find({
      seller: userId,
      transaction: transactionId,
    })
      .populate({
        path: DB.Product,
        populate: [
          { path: DB.Posting },
          {
            path: DB.Price,
          },
        ],
      })
      .populate({
        path: DB.Refund,
      })
      .populate({
        path: DB.Transaction,
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(purchases)),
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
