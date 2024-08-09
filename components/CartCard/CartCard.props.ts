import { CartDeletePayload, CartEditPayload } from "@/types/Cart";

export interface CartCardProps {
  cartId: string;
  cartQuantity: number;
  description: string;
  images: string[];
  onDelete: (values: CartDeletePayload) => void;
  onEdit: (values: CartEditPayload) => void;
  price: number;
  productQuantity: number;
  title: string;
}
