"use client";

import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import styles from "./CartForm.module.css";
import { CartFormProps } from "./CartForm.props";
import AutoComplete from "@/components/AutoComplete";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Text from "@/components/Text";
import { addCart } from "@/services/cart";
import { CartFormValues } from "@/types/Cart";

export default (props: CartFormProps) => {
  const { productId, quantity } = props;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialValues: CartFormValues = {
    quantity: "",
  };

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .required("Quantity is required.")
      .typeError("Quantity must be a number.")
      .moreThan(0, "Quantity must be larger than 0.")
      .integer("Quantity must be an integer."),
  });

  const handleSubmit = async (values: CartFormValues) => {
    setIsSubmitting(true);

    const cartFormData = new FormData();
    cartFormData.append("productId", productId);
    cartFormData.append("quantity", values.quantity);
    const cartResponse = await addCart(cartFormData);

    if (cartResponse.ok) {
      toast.success(cartResponse.message);
    } else {
      toast.error(cartResponse.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      {quantity === 0 ? (
        <Text color="red" style={{ fontSize: "18px" }}>
          Out of Stock
        </Text>
      ) : (
        <>
          <Text color="green" style={{ fontSize: "18px" }}>
            In Stock
          </Text>
        </>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue, touched, errors }) => (
          <>
            <AutoComplete
              error={touched.quantity ? errors.quantity : ""}
              option={{ label: "1", value: "1" }}
              options={Array.from({ length: quantity }, (_, i) => quantity - i)
                .map((quantity) => ({
                  label: quantity.toString(),
                  value: quantity.toString(),
                }))
                .reverse()}
              setOption={(option) => {
                if (option?.value) {
                  setFieldValue("quantity", option.value);
                } else {
                  setFieldValue("quantity", "");
                }
              }}
            />
            <Button
              color="yellow"
              onClick={handleSubmit}
              disabled={isSubmitting ? true : false}
            >
              {isSubmitting ? <Loader /> : "Add to Card"}
            </Button>
          </>
        )}
      </Formik>
    </div>
  );
};
