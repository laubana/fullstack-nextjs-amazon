import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import Text from "@/components/Text";

export default (props: ButtonProps) => {
  const {
    block,
    children,
    color = "yellow",
    nopadding,
    onClick,
    size = "medium",
    type = "button",
  } = props;

  return (
    <button
      className={`${styles.button} ${styles[`color-${color}`]} ${
        styles[`padding-${size}`]
      } ${block ? styles.block : null} ${nopadding ? styles.nopadding : null}`}
      type={type}
      onClick={onClick}
    >
      <Text alignment="center" size={size}>
        {children}
      </Text>
    </button>
  );
};
