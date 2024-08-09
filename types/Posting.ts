import { Category } from "@/types/Category";
import { User } from "@/types/User";

export type Posting = {
  _id: string;
  category: Category;
  title: string;
  user: User;
};

export type PostingFormValues = {
  [key: string]: any;
  categoryId: string;
  productNumber: number;
  title: string;
};
