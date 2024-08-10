import { create } from "zustand";
import { Cart } from "@/types/Cart";

type Store = {
  carts: Cart[];
  setCarts: (carts: Cart[]) => void;
};

export const useStore = create<Store>((set) => ({
  carts: [],
  setCarts: (carts) => {
    set((state) => {
      return { ...state, carts };
    });
  },
}));
