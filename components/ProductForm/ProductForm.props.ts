import { ProductForm } from "@/types/Product";

export interface ProductFormProps {
  onCancel: () => void;
  onConfirm: (props: ProductForm) => void;
}
