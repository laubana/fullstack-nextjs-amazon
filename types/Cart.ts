import { Product } from "@/types/Product";
import { User } from "@/types/User";

export type Cart = {
  _id: string;
  product: Product;
  quantity: number;
  user: User;
};

export type CartDeletePayload = {
  cartId: string;
};

export type CartEditPayload = {
  cartId: string;
  quantity: string;
};

export type CartFormValues = {
  quantity: string;
};
