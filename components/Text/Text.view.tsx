import styles from "./Text.module.css";
import { TextProps } from "./Text.props";

export default (props: TextProps) => {
  const { children, color = "black", size = 16, style, weight = 400 } = props;

  return (
    <div
      className={styles.text}
      style={{
        color: color,
        fontSize: `${size}px`,
        fontWeight: weight,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
