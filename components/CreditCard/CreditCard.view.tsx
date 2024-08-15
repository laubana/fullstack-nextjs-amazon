import styles from "./CreditCard.module.css";
import { CreditCardProps } from "./CreditCard.pros";

import Text from "@/components/Text";

export default (props: CreditCardProps) => {
  const { brand, last4 } = props;

  return (
    <div className={styles.container}>
      <Text weight="bold" style={{ textTransform: "uppercase" }}>
        {brand}
      </Text>
      <Text>ending in</Text>
      <Text>{last4}</Text>
    </div>
  );
};
