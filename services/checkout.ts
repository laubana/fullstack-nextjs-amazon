"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";
import db from "@/configs/db";

import { DB } from "@/const/db";

import { confirmPaymentIntent, createPaymentIntent } from "@/helpers/stripe";

import User from "@/models/User";
import Cart from "@/models/Cart";
import Transaction from "@/models/Transaction";
import Purchase from "@/models/Purchase";

export const checkout = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const cartIds = props.getAll("cartIds") as string[];
    const paymentMethodId = props.get("paymentMethodId") as string;
    const userId = session?.user?.id;

    if (!cartIds || cartIds.length === 0 || !paymentMethodId) {
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

    const carts = await Cart.find({ _id: { $in: cartIds } }).populate({
      path: DB.Product,
      populate: [
        { path: DB.Posting, populate: { path: DB.User } },
        { path: DB.Price },
      ],
    });

    const amount = carts.reduce((sum, cart) => {
      return sum + cart.quantity * cart.product.price.value;
    }, 0);

    const createdPaymentIntent = await createPaymentIntent({
      amount: +amount,
      customerId: user.customerId,
      paymentMethodId,
    });

    const confirmedPaymentIntent = await confirmPaymentIntent({
      paymentIntentId: createdPaymentIntent.id,
    });

    const postingIds = [];

    for (const cart of carts) {
      postingIds.push(cart.product.posting._id.toString());
    }

    const transaction = await Transaction.create({
      paymentIntentId: confirmedPaymentIntent.id,
      paymentMethodId,
      postings: postingIds,
      user,
    });

    const purchases = [];

    for (const cart of carts) {
      const purchase = await Purchase.create({
        buyer: userId,
        product: cart.product._id.toString(),
        quantity: +cart.quantity,
        seller: cart.product.posting.user._id.toString(),
        transaction: transaction._id.toString(),
      });

      purchases.push(purchase);

      await Cart.findOneAndDelete({
        _id: cart._id.toString(),
      });
    }

    return {
      message: "Refund requested successfully.",
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
