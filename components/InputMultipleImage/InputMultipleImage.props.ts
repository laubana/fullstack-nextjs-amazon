import { ImageListType } from "react-images-uploading";

export type size = "small" | "medium" | "large";

export interface InputMultipleImageProps {
  error?: string;
  images?: ImageListType;
  label?: string;
  setImages: (images: ImageListType) => void;
  size?: size;
}
