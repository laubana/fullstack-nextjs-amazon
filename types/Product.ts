import { ImageType } from "react-images-uploading";
import { Posting } from "@/types/Posting";
import { Price } from "@/types/Price";

export type Product = {
  _id: string;
  description: string;
  images: string[];
  name: string;
  posting: Posting;
  price: Price;
  quantity: number;
};

export type ProductFormValues = {
  [key: string]: any;
  description: string;
  imageNumber: number;
  images: ImageType[];
  name: string;
  price: string;
  quantity: string;
};
