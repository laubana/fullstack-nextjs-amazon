"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";
import db from "@/configs/db";

import { DB } from "@/const/db";

import { createRefund } from "@/helpers/stripe";

import Purchase from "@/models/Purchase";
import Refund from "@/models/Refund";
import User from "@/models/User";

export const approveRefund = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const purchaseId = props.get("purchaseId") as string;
    const userId = session?.user?.id;

    if (!purchaseId) {
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

    const oldPurchase = await Purchase.findById(purchaseId)
      .populate({
        path: DB.Product,
        populate: {
          path: DB.Price,
        },
      })
      .populate({
        path: DB.Refund,
      })
      .populate({ path: DB.Transaction });

    if (!oldPurchase) {
      return { message: "No purchase found.", ok: false };
    }

    if (!oldPurchase.refund) {
      return { message: "No refund requested.", ok: false };
    }

    const stripeRefund = await createRefund({
      amount: oldPurchase.product.price.value * oldPurchase.quantity,
      paymentIntentId: oldPurchase.transaction.paymentIntentId,
    });

    const editedRefund = await Refund.findByIdAndUpdate(
      oldPurchase.refund._id.toString(),
      { isApproved: true, refundId: stripeRefund.id }
    );

    if (!editedRefund) {
      return { message: "No refund edited.", ok: false };
    }

    const newPurchase = await Purchase.findById(purchaseId)
      .populate({
        path: DB.Product,
        populate: {
          path: DB.Price,
        },
      })
      .populate({
        path: DB.Refund,
      })
      .populate({ path: DB.Transaction });

    return {
      message: "Refund approved successfully.",
      data: JSON.parse(JSON.stringify(newPurchase)),
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

export const cancelRefund = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const purchaseId = props.get("purchaseId") as string;
    const userId = session?.user?.id;

    if (!purchaseId) {
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

    const originalPurchase = await Purchase.findById(purchaseId).populate({
      path: DB.Refund,
    });

    if (!originalPurchase) {
      return { message: "No purchase found.", ok: false };
    }

    if (!originalPurchase.refund) {
      return { message: "No refund requested.", ok: false };
    }

    const deletedRefund = await Refund.findByIdAndDelete(
      originalPurchase.refund._id.toString()
    );

    if (!deletedRefund) {
      return { message: "No refund deleted.", ok: false };
    }

    const editedPurchase = await Purchase.findOneAndUpdate(
      {
        _id: purchaseId,
      },
      { $unset: { refund: null } }
    );

    if (!editedPurchase) {
      return { message: "No purchase updated.", ok: false };
    }

    const purchase = await Purchase.findById(purchaseId)
      .populate({
        path: DB.Refund,
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
      message: "Refund canceled successfully.",
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

export const requestRefund = async (props: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const purchaseId = props.get("purchaseId") as string;
    const userId = session?.user?.id;

    if (!purchaseId) {
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

    const originalPurchase = await Purchase.findById(purchaseId).populate({
      path: DB.Refund,
    });

    if (!originalPurchase) {
      return { message: "No purchase found.", ok: false };
    }

    if (originalPurchase.refund) {
      return { message: "Refund already requested.", ok: false };
    }

    const refund = await Refund.create({
      quantity: +originalPurchase.quantity,
    });

    const editedPurchase = await Purchase.findOneAndUpdate(
      {
        _id: purchaseId,
      },
      { refund: refund._id.toString() }
    );

    if (!editedPurchase) {
      return { message: "No purchase updated.", ok: false };
    }

    const purchase = await Purchase.findById(purchaseId)
      .populate({
        path: DB.Refund,
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
      message: "Refund requested successfully.",
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
