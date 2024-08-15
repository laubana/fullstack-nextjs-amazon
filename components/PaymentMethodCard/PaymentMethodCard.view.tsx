import styles from "./PaymentMethodCard.module.css";
import { PaymentMethodCardProps } from "./PaymentMethodCard.props";

import CreditCard from "@/components/CreditCard";
import Text from "@/components/Text";

export default (props: PaymentMethodCardProps) => {
  const {
    brand,
    expiryMonth,
    expiryYear,
    last4,
    onClick,
    selected = false,
  } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : null}`}
      onClick={handleClick}
    >
      <div>
        <input checked={selected} readOnly type="radio" />
      </div>
      <CreditCard brand={brand} last4={last4} />
      <Text>{`${
        10 < expiryMonth ? expiryMonth : `0${expiryMonth}`
      }/${expiryYear}`}</Text>
    </div>
  );
};
