"use client";

import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import styles from "./PostingForm.module.css";
import { PostingFormProps } from "./PostingForm.props";

import AutoComplete from "@/components/AutoComplete";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import ProductCard from "@/components/PostingCard";
import ProductForm from "@/components/ProductForm";
import Text from "@/components/Text";

import { addPosting } from "@/controllers/posting";
import { addPrice } from "@/controllers/price";
import { addProduct } from "@/controllers/product";

import { Posting, PostingFormValues } from "@/types/Posting";
import { Price } from "@/types/Price";
import { ProductFormValues } from "@/types/Product";

export default (props: PostingFormProps) => {
  const { categories = [] } = props;

  const [isProductVisible, setIsProductVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductFormValues[]>([]);

  const initialValues: PostingFormValues = {
    categoryId: "",
    productNumber: 0,
    title: "",
  };

  const validationSchema = Yup.object({
    categoryId: Yup.string().required("Category is required"),
    productNumber: Yup.number()
      .moreThan(0, "Products are required.")
      .required("Products are required."),
    title: Yup.string().required("Title is required"),
  });

  const handleAddProduct = () => {
    setIsProductVisible(true);
  };

  const handleCancelProduct = () => {
    setIsProductVisible(false);
  };

  const handleConfirmProduct = (values: ProductFormValues) => {
    setProducts((prevState) => [...prevState, { ...values }]);
    setIsProductVisible(false);
  };

  const handleSubmit = async (values: PostingFormValues) => {
    const postingFormData = new FormData();
    postingFormData.append("categoryId", values.categoryId);
    postingFormData.append("title", values.title);

    const postingResponse = await addPosting(postingFormData);
    const postingData = postingResponse.data as Posting;

    if (postingResponse.ok) {
      const postingId = postingData._id;

      for (const product of products) {
        const priceFormData = new FormData();
        priceFormData.append("value", product.price);

        const priceResponse = await addPrice(priceFormData);
        const priceData = priceResponse.data as Price;

        if (priceResponse.ok) {
          const priceId = priceData._id;

          const productFormData = new FormData();
          productFormData.append("description", product.description);
          product.images.forEach((image) => {
            if (image.file) {
              productFormData.append("images", image.file);
            }
          });
          productFormData.append("name", product.name);
          productFormData.append("postingId", postingId);
          productFormData.append("priceId", priceId);
          productFormData.append("quantity", product.quantity);

          const productResponse = await addProduct(productFormData);

          if (productResponse.ok) {
            toast.success(productResponse.message);
          } else {
            toast.error(productResponse.message);
          }
        } else {
          toast.error(priceResponse.message);
        }
      }
    } else {
      toast.error(postingResponse.message);
    }
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
              error={touched.title ? errors.title : ""}
              label="Title"
              setText={(text) => {
                setFieldValue("title", text);
              }}
              text={values.title}
            />
            <AutoComplete
              error={touched.categoryId ? errors.categoryId : ""}
              label="Category"
              options={categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
              setOption={(option) => {
                if (option?.value) {
                  setFieldValue("categoryId", option.value);
                } else {
                  setFieldValue("categoryId", "");
                }
              }}
            />
            <div>
              <Text>Products</Text>
              <div>
                {products.map((product) => (
                  <div
                    className={styles["product-container"]}
                    key={product.name}
                  >
                    <ProductCard
                      description={product.description}
                      images={product.images.map(
                        (image) => image.dataURL ?? ""
                      )}
                      name={product.name}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
              {isProductVisible ? (
                <ProductForm
                  onCancel={handleCancelProduct}
                  onConfirm={(props) => {
                    handleConfirmProduct(props);
                    setFieldValue("productNumber", values.productNumber + 1);
                  }}
                />
              ) : (
                <Button block onClick={handleAddProduct}>
                  Add Product
                </Button>
              )}
              {touched.productNumber && errors.productNumber ? (
                <Text color="red">{errors.productNumber}</Text>
              ) : null}
            </div>
            <Button onClick={handleSubmit}>Post</Button>
          </>
        )}
      </Formik>
    </div>
  );
};
