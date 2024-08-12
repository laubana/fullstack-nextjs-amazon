import styles from "./PaymentMethodCard.module.css";
import { PaymentMethodCardProps } from "./PaymentMethodCard.props";
import Text from "@/components/Text";

export default (props: PaymentMethodCardProps) => {
  const { brand, expiry, last4 } = props;

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles["left-container"]}>
        <Text weight="bold" style={{ textTransform: "uppercase" }}>
          {brand}
        </Text>
        <Text>ending in</Text>
        <Text>{last4}</Text>
      </div>
      <Text>{expiry}</Text>
    </div>
  );
};
