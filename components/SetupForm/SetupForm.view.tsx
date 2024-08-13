"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { SetupFormProps } from "./SetupForm.props";
import { FormEvent } from "react";
import styles from "./SetupForm.module.css";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Text from "@/components/Text";
import { addSetupIntent } from "@/services/stripe";
import { SetupIntent } from "@/types/SetupIntent";

export default (props: SetupFormProps) => {
  const {} = props;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError && submitError.message) {
      return;
    }

    const setupIntentResponse = await addSetupIntent();
    const setupIntentData = setupIntentResponse.data as SetupIntent;

    const { error: confirmError } = await stripe.confirmSetup({
      elements,
      clientSecret: setupIntentData.client_secret,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });

    if (confirmError && confirmError.message) {
      return;
    }
  };

  return (
    <>
      {stripe && elements ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles["stripe-container"]}>
            <PaymentElement
              options={{
                business: { name: "Amazon" },
              }}
            />
            <Text alignment="right" color="light-grey" size="small">
              Powered by Stripe
            </Text>
          </div>
          <Button type="submit">Add and continue</Button>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
};
