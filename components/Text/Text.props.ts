import { CSSProperties, ReactNode } from "react";

export interface TextProps {
  children: ReactNode;
  color?: string;
  size?: number;
  style?: CSSProperties;
  weight?: number;
}
