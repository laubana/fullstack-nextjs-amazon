"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import db from "@/configs/db";
import { DB } from "@/const/db";
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

export const editCart = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const cartId = props.get("cartId") as string;
    const quantity = props.get("quantity") as string;
    const userId = session?.user?.id;

    if (!cartId || !quantity) {
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

    const editedCart = await Cart.findOneAndUpdate({
      _id: cartId,
      quantity,
      user: userId,
    });

    if (!editedCart) {
      return { message: "No cart found.", ok: false };
    }

    return {
      message: "Cart updated successfully.",
      data: JSON.parse(JSON.stringify(editedCart)),
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

export const getAllCarts = async () => {
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

    const carts = await Cart.find({})
      .populate({
        path: DB.Product,
        populate: {
          path: DB.Price,
        },
      })
      .populate({
        path: DB.User,
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(carts)),
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

export const removeCart = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const cartId = props.get("cartId") as string;
    const userId = session?.user?.id;

    if (!cartId) {
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

    const removedCart = await Cart.findOneAndDelete({
      _id: cartId,
      user: userId,
    });

    if (!removedCart) {
      return { message: "No cart found.", ok: false };
    }

    return {
      message: "Cart deleted successfully.",
      data: JSON.parse(JSON.stringify(removedCart)),
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
