import { User } from "@/types/User";

export type Transaction = {
  _id: string;
  paymentIntentId: string;
  paymentMethodId: string;
  createdAt: Date;
  user: User;
};
