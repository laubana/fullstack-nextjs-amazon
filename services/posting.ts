"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import db from "@/configs/db";
import Posting from "@/models/Posting";
import Category from "@/models/Category";
import User from "@/models/User";

export const addPosting = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const categoryId = props.get("categoryId") as string;
    const title = props.get("title") as string;
    const userId = session?.user?.id;

    if (!categoryId || !title) {
      return { message: "Invalid Input", ok: false };
    }

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const category = await Category.findById(categoryId);

    if (!category) {
      return { message: "No category found.", ok: false };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const posting = await Posting.create({
      category: categoryId,
      title,
      user,
    });

    return {
      message: "Posting created successfully.",
      data: JSON.parse(JSON.stringify(posting)),
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

export const getAllPostings = async () => {
  try {
    await db();

    const postings = await Posting.find({});

    return {
      message: "",
      data: JSON.parse(JSON.stringify(postings)),
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

export const getPosting = async (props: FormData) => {
  try {
    const postingId = props.get("postingId") as string;

    await db();

    const posting = await Posting.findById(postingId);

    return {
      message: "",
      data: JSON.parse(JSON.stringify(posting)),
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
