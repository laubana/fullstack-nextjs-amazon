import { Product } from "@/types/Product";
import { Transaction } from "@/types/Transaction";

export type Purchase = {
  _id: string;
  paymentIntentId: string;
  product: Product;
  quantity: number;
  transaction: Transaction;
};
