import { CSSProperties, ReactNode } from "react";

export type Alignment = "center" | "left" | "right";
export type Color = "black" | "green" | "grey" | "light-grey" | "red" | "white";
export type Size = "large" | "medium" | "small";
export type Weight = "bold" | "light" | "regular";

export interface TextProps {
  alignment?: Alignment;
  children: ReactNode;
  color?: Color;
  size?: Size;
  style?: CSSProperties;
  weight?: Weight;
}
