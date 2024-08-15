"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";

import db from "@/configs/db";

import { DB } from "@/const/db";

import Posting from "@/models/Posting";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export const getAllTransactions = async () => {
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

    const transactions = await Transaction.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: DB.User,
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(transactions)),
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

export const getTransactions = async () => {
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

    const postings = await Posting.find({ user: userId }).populate({
      path: DB.User,
    });

    const postingIds = [];

    for (const posting of postings) {
      postingIds.push(posting._id.toString());
    }

    const transactions = await Transaction.find({
      postings: { $in: postingIds },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: DB.User,
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(transactions)),
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
