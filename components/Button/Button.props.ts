import { ReactNode } from "react";

export type Color = "white" | "yellow";
export type Size = "large" | "medium" | "small";
export type Type = "button" | "submit";

export interface ButtonProps {
  block?: boolean;
  children: ReactNode;
  color?: Color;
  nopadding?: boolean;
  onClick?: () => void;
  size?: Size;
  type?: Type;
}
