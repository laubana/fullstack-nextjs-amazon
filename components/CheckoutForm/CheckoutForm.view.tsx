"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

import styles from "./CheckoutForm.module.css";
import { CheckoutFormProps } from "./CheckoutForm.props";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import SetupForm from "@/components/SetupForm";
import Text from "@/components/Text";

import { useStore } from "@/configs/store";

import { getAllPaymentMethods } from "@/controllers/stripe";

import { checkout } from "@/services/checkout";

import { PaymentMethod } from "@/types/PaymentMethod";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
);

export default (props: CheckoutFormProps) => {
  const {} = props;

  const router = useRouter();
  const store = useStore();

  const carts = store.carts;

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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethodIndex, setSelectedPaymentMethodIndex] =
    useState<number>(0);
  const [isPlacing, setIsPlacing] = useState<boolean>(false);

  const handleCancel = () => {
    router.push("/carts");
  };

  const handleClick = (index: number) => {
    setSelectedPaymentMethodIndex(index);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handlePlaceOrder = async () => {
    if (paymentMethods[selectedPaymentMethodIndex].id) {
      setIsPlacing(true);

      const checkoutFormData = new FormData();
      for (const cart of carts) {
        checkoutFormData.append("cartIds", cart._id);
      }
      checkoutFormData.append(
        "paymentMethodId",
        paymentMethods[selectedPaymentMethodIndex].id
      );
      const checkoutResponse = await checkout(checkoutFormData);

      if (checkoutResponse.ok) {
        router.push("/");
      } else {
        toast.error(checkoutResponse.message);
      }

      setIsPlacing(false);
    }
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
    if (carts.length !== 0) {
      setTotalItemNumber(
        carts.reduce((sum, cart) => {
          return sum + cart.quantity;
        }, 0)
      );

      setTotalPrice(
        carts.reduce((sum, cart) => {
          return sum + cart.quantity * cart.product.price.value;
        }, 0)
      );
    } else {
      router.push("/");
    }
  }, [carts]);

  return (
    <>
      <div>
        <div className={styles.header}>
          <Text alignment="center" style={{ fontSize: "28px" }}>
            Checkout ({totalItemNumber} items)
          </Text>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div>
              <Text style={{ fontSize: "18px" }} weight="bold">
                Choose a payment method
              </Text>
              <div className={styles["payment-method-list-header-container"]}>
                <div></div>
                <div></div>
                <Text color="grey">Expiry</Text>
              </div>
              <div>
                {paymentMethods.map((paymentMethodItem, paymentMethodIndex) => (
                  <PaymentMethodCard
                    brand={paymentMethodItem.card.brand}
                    expiryMonth={paymentMethodItem.card.exp_month}
                    expiryYear={paymentMethodItem.card.exp_year}
                    last4={paymentMethodItem.card.last4}
                    onClick={() => handleClick(paymentMethodIndex)}
                    paymentMethodId={paymentMethodItem.id}
                    selected={paymentMethodIndex === selectedPaymentMethodIndex}
                    key={paymentMethodItem.id}
                  />
                ))}
              </div>
            </div>
            <div>
              <Button color="white" onClick={handleOpen}>
                Add a credit or debit card
              </Button>
            </div>
          </div>
          <div className={styles.right}>
            <Button block disabled={isPlacing} onClick={handlePlaceOrder}>
              Proceed to Checkout
            </Button>
            <Button color="white" block onClick={handleCancel}>
              Cancel
            </Button>
            <hr className={styles.divider} />
            <Text style={{ fontSize: "18px" }} weight="bold">
              Order Summary
            </Text>
            <div className={styles["order-total-container"]}>
              <Text color="red" weight="bold" style={{ fontSize: "18px" }}>
                Order Total:
              </Text>
              <Text color="red" weight="bold" style={{ fontSize: "18px" }}>
                ${(totalPrice / 100).toFixed(2)}
              </Text>
            </div>
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
