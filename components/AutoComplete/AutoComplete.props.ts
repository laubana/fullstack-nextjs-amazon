import { Option } from "@/types/Option";

export type Size = "small" | "medium" | "large";

export interface AutoCompleteProps {
  error?: string;
  label?: string;
  option?: Option;
  options: Option[];
  placeholder?: string;
  setOption: (option: Option | undefined) => void;
  size?: Size;
}
