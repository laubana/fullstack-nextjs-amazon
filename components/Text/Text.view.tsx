import styles from "./Text.module.css";
import { TextProps } from "./Text.props";

export default (props: TextProps) => {
  const {
    alignment = "left",
    children,
    color = "black",
    size = "medium",
    style,
    weight = "regular",
  } = props;

  return (
    <div
      className={`${styles[`alignment-${alignment}`]} ${
        styles[`color-${color}`]
      } ${styles[`font-${size}`]} ${styles[`weight-${weight}`]} ${styles.text}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
