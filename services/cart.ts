"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import db from "@/configs/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";

export const addCart = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const productId = props.get("productId") as string;
    const quantity = props.get("quantity") as string;
    const userId = session?.user?.id;

    if (!productId || !quantity) {
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

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const oldCart = await Cart.findOne({ product: productId });

    if (oldCart) {
      return {
        message: "The product already exists.",
        ok: false,
      };
    }

    const newCart = await Cart.create({
      product: productId,
      quantity: +quantity,
      user,
    });

    return {
      message: "Cart created successfully.",
      data: JSON.parse(JSON.stringify(newCart)),
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
