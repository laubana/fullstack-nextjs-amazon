"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import db from "@/configs/db";
import { DB } from "@/const/db";
import { uploadImage } from "@/helpers/s3";
import { createPrice, createProduct } from "@/helpers/stripe";
import Posting from "@/models/Posting";
import User from "@/models/User";
import Price from "@/models/Price";
import Product from "@/models/Product";

export const addProduct = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const description = props.get("description") as string;
    const images = props.getAll("images") as File[];
    const name = props.get("name") as string;
    const postingId = props.get("postingId") as string;
    const priceId = props.get("priceId") as string;
    const quantity = props.get("quantity") as string;
    const userId = session?.user?.id;

    if (
      !description ||
      !images ||
      images.length === 0 ||
      !name ||
      !postingId ||
      !priceId ||
      !quantity
    ) {
      return { message: "Invalid Input", ok: false };
    }

    if (!userId) {
      return { message: "Forbidden", ok: false };
    }

    await db();

    const posting = await Posting.findById(postingId);

    if (!posting) {
      return { message: "No user found.", ok: false };
    }

    const price = await Price.findById(priceId);

    if (!price) {
      return { message: "No price found.", ok: false };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { message: "No user found.", ok: false };
    }

    const imageUrls = [];

    for (const image of images) {
      if (image) {
        imageUrls.push(await uploadImage({ image }));
      }
    }

    const stripeProduct = await createProduct({
      description,
      name,
    });

    await createPrice({
      price: price.value,
      productId: stripeProduct.id,
    });

    const product = await Product.create({
      description,
      images: imageUrls,
      name,
      posting: postingId,
      price: priceId,
      productId: stripeProduct.id,
      quantity: +quantity,
    });

    return {
      message: "Product created successfully.",
      data: JSON.parse(JSON.stringify(product)),
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

export const getAllProducts = async () => {
  try {
    await db();

    const products = await Product.find({})
      .populate({
        path: DB.Posting.toLowerCase(),
      })
      .populate({
        path: DB.Price.toLowerCase(),
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(products)),
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

export const getProducts = async (props: FormData) => {
  try {
    const postingId = props.get("postingId") as string;

    await db();

    const products = await Product.find({ posting: postingId })
      .populate({
        path: DB.Posting.toLowerCase(),
      })
      .populate({
        path: DB.Price.toLowerCase(),
      });

    return {
      message: "",
      data: JSON.parse(JSON.stringify(products)),
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
