"use client";

import { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.css";
import { CheckoutFormProps } from "./CheckoutForm.props";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { useStore } from "@/configs/store";

export default (props: CheckoutFormProps) => {
  const carts = useStore.getState().carts;

  const [totalItemNumber, setTotalItemNumber] = useState<number>(0);

  useEffect(() => {
    setTotalItemNumber(
      carts.reduce((sum, cart) => {
        return sum + cart.quantity;
      }, 0)
    );
  }, [carts]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Text alignment="center" style={{ fontSize: "28px" }}>
            Checkout ({totalItemNumber} items)
          </Text>
        </div>
        <div className={styles.wrapper}>
          <div>
            <Text style={{ fontSize: "18px" }} weight="bold">
              Payment Method
            </Text>
          </div>
          <div className={styles.right}>
            <Button block>Place Your Order</Button>
            <hr className={styles.divider} />
            <Text style={{ fontSize: "18px" }} weight="bold">
              Order Summary
            </Text>
          </div>
        </div>
      </div>
      <Modal visibility onClose={() => null}>
        <Text style={{ fontSize: "18px" }} weight="bold">
          Add a credit or debit card
        </Text>
      </Modal>
    </>
  );
};
