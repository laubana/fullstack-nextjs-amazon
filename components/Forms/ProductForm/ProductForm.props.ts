import { ProductFormValues } from "@/types/Product";

export interface ProductFormProps {
  onCancel: () => void;
  onConfirm: (values: ProductFormValues) => void;
}
