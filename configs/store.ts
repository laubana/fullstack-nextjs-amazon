import { create } from "zustand";

import { Cart } from "@/types/Cart";

type Store = {
  carts: Cart[];
  categoryId: string;
  categoryName: string;
  productName: string;
  setCarts: (carts: Cart[]) => void;
  setCategoryId: (categoryId: string) => void;
  setCategoryName: (categoryName: string) => void;
  setProductName: (productName: string) => void;
};

export const useStore = create<Store>((set) => ({
  carts: [],
  categoryId: "",
  categoryName: "All",
  productName: "",
  setCarts: (carts) => {
    set((state) => {
      return { ...state, carts };
    });
  },
  setCategoryId: (categoryId) => {
    set((state) => {
      return { ...state, categoryId };
    });
  },
  setCategoryName: (categoryName) => {
    set((state) => {
      return { ...state, categoryName };
    });
  },
  setProductName: (productName) => {
    set((state) => {
      return { ...state, productName };
    });
  },
}));
