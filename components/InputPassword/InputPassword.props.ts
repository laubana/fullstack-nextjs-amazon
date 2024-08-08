export type Size = "small" | "medium" | "large";

export interface InputPasswordProps {
  error?: string;
  label?: string;
  password?: string;
  placeholder?: string;
  setPassword?: (text: string) => void;
  size?: Size;
}
