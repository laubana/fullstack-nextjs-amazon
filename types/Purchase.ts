import { Product } from "@/types/Product";
import { Refund } from "./Refund";
import { Transaction } from "@/types/Transaction";
import { User } from "@/types/User";

export type Purchase = {
  _id: string;
  buyer: User;
  product: Product;
  quantity: number;
  refund: Refund | null;
  seller: User;
  transaction: Transaction;
};
