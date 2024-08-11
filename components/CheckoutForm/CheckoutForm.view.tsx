"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import styles from "./CheckoutForm.module.css";
import { CheckoutFormProps } from "./CheckoutForm.props";
import Button from "@/components/Button";
import SetupForm from "@/components/SetupForm";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { useStore } from "@/configs/store";
import { getAllPaymentMethods } from "@/services/stripe";
import { PaymentMethod } from "@/types/PaymentMethod";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
);

export default (props: CheckoutFormProps) => {
  const {} = props;

  const carts = useStore.getState().carts;

  const options: StripeElementsOptions = {
    appearance: {
      variables: { fontFamily: '"Amazon Ember", Arial, sans-serif' },
    },
    currency: "cad",
    locale: "en",
    mode: "setup",
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [totalItemNumber, setTotalItemNumber] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const main = async () => {
      const paymentMethodsResponse = await getAllPaymentMethods();
      const paymentMethodsData = paymentMethodsResponse.data as PaymentMethod[];

      setPaymentMethods(paymentMethodsData);
    };
    main();
  }, []);

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
              Choose a payment method
            </Text>
            <div>
              {paymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id}>
                  <Text>{paymentMethod.card.last4}</Text>
                  <Text>
                    {paymentMethod.card.exp_month} {paymentMethod.card.exp_year}
                  </Text>
                </div>
              ))}
            </div>
            <Button color="white" onClick={handleOpen}>
              Add a credit or debit card
            </Button>
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
      <Modal visibility={isVisible} onClose={handleClose}>
        <div className={styles["stripe-container"]}>
          <Text style={{ fontSize: "18px" }} weight="bold">
            Add a credit or debit card
          </Text>
          <div>
            <Elements stripe={stripePromise} options={options}>
              <SetupForm />
            </Elements>
          </div>
        </div>
      </Modal>
    </>
  );
};
