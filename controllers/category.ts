"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";
import db from "@/configs/db";

import Category from "@/models/Category";

export const addCategory = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const name = props.get("name") as string;
    const role = session?.user?.role;

    if (!name) {
      return { message: "Invalid Input", ok: false };
    }

    if (!role || role !== "admin") {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const oldCategory = await Category.findOne({ name });

    if (oldCategory) {
      return {
        message: "The name already exists.",
        ok: false,
      };
    }

    const newCategory = await Category.create({
      name,
    });

    return {
      message: "Category created successfully.",
      data: JSON.parse(JSON.stringify(newCategory)),
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

export const getAllCategories = async () => {
  try {
    await db();

    const categories = await Category.find({});

    return {
      message: "",
      data: JSON.parse(JSON.stringify(categories)),
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
