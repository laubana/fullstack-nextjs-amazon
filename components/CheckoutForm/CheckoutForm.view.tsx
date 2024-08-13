"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import styles from "./CheckoutForm.module.css";
import { CheckoutFormProps } from "./CheckoutForm.props";
import Button from "@/components/Button";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import SetupForm from "@/components/SetupForm";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { useStore } from "@/configs/store";
import { removeCart } from "@/services/cart";
import { addPurchase } from "@/services/purchase";
import { addPaymentIntent, getAllPaymentMethods } from "@/services/stripe";
import { addTransaction } from "@/services/transaction";
import { PaymentIntent } from "@/types/PaymentIntent";
import { PaymentMethod } from "@/types/PaymentMethod";
import { Purchase } from "@/types/Purchase";
import { Transaction } from "@/types/Transaction";

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
      const paymentIntentFormData = new FormData();
      paymentIntentFormData.append("amount", totalPrice.toString());
      paymentIntentFormData.append(
        "paymentMethodId",
        paymentMethods[selectedPaymentMethodIndex].id
      );

      const paymentIntentResponse = await addPaymentIntent(
        paymentIntentFormData
      );
      const paymentIntentData = paymentIntentResponse.data as PaymentIntent;

      if (paymentIntentResponse.ok) {
        const transactionResponse = await addTransaction();
        const transactionData = transactionResponse.data as Transaction;

        if (transactionResponse.ok) {
          for (const cart of carts) {
            const purchaseFormData = new FormData();
            purchaseFormData.append("paymentIntentId", paymentIntentData.id);
            purchaseFormData.append("productId", cart.product._id);
            purchaseFormData.append("quantity", cart.quantity.toString());
            purchaseFormData.append("transactionId", transactionData._id);

            const purchaseResponse = await addPurchase(purchaseFormData);
            const purchaseData = purchaseResponse.data as Purchase;

            if (purchaseResponse.ok) {
              const cartFormData = new FormData();
              cartFormData.append("cartId", cart._id);

              await removeCart(cartFormData);
            }
          }
        }
      }
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
      // router.push("/");
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
            <Button block onClick={handlePlaceOrder}>
              Place Your Order
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
