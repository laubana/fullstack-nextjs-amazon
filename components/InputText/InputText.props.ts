export type Size = "small" | "medium" | "large";

export interface InputTextProps {
  error?: string;
  label?: string;
  placeholder?: string;
  setText?: (text: string) => void;
  size?: Size;
  text?: string;
}
