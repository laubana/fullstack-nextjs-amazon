"use client";

import { Formik } from "formik";
import { useState } from "react";
import { ImageType } from "react-images-uploading";
import * as Yup from "yup";
import styles from "./ProductForm.module.css";
import { ProductFormProps } from "./ProductForm.props";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import InputMultipleImage from "@/components/InputMultipleImage";
import { ProductForm } from "@/types/Product";

export default (props: ProductFormProps) => {
  const { onCancel, onConfirm } = props;

  const [images, setImages] = useState<ImageType[]>([]);

  const initialValues: ProductForm = {
    description: "",
    imageNumber: 0,
    images: [],
    name: "",
    price: "",
    quantity: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required."),
    imageNumber: Yup.number()
      .moreThan(0, "Images are required.")
      .required("Images are required."),
    name: Yup.string().required("Name is required."),
    price: Yup.number()
      .required("Price is required.")
      .typeError("Price must be a number.")
      .moreThan(0, "Price must be larger than 0.")
      .integer("Price must be an integer."),
    quantity: Yup.number()
      .required("Quantity is required.")
      .typeError("Quantity must be a number.")
      .moreThan(0, "Quantity must be larger than 0.")
      .integer("Quantity must be an integer."),
  });

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = async (values: ProductForm) => {
    onConfirm({ ...values, images });
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue, touched, errors }) => (
          <>
            <InputText
              error={touched.name ? errors.name : ""}
              label="Name"
              setText={(text) => {
                setFieldValue("name", text);
              }}
              text={values.name}
            />
            <InputText
              error={touched.description ? errors.description : ""}
              label="Description"
              setText={(text) => {
                setFieldValue("description", text);
              }}
              text={values.description}
            />
            <InputText
              error={touched.price ? errors.price : ""}
              label="Price"
              setText={(text) => {
                setFieldValue("price", text);
              }}
              text={values.price}
            />
            <InputText
              error={touched.quantity ? errors.quantity : ""}
              label="Quantity"
              setText={(text) => {
                setFieldValue("quantity", text);
              }}
              text={values.quantity}
            />
            <InputMultipleImage
              error={touched.imageNumber ? errors.imageNumber : ""}
              images={images}
              label="Images"
              setImages={(images) => {
                setImages(images);
                setFieldValue("imageNumber", images.length);
              }}
            />
            <Button onClick={handleSubmit}>Confirm</Button>
            <Button block color="white" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Formik>
    </div>
  );
};
