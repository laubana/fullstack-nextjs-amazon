"use client";

import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./CategoryForm.module.css";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Text from "@/components/Text";
import { addCategory } from "@/services/category";
import { CategoryForm } from "@/types/Category";

export default () => {
  const [error, setError] = useState<string>("");

  const initialValues: CategoryForm = {
    name: "name",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
  });

  const handleSubmit = async (values: CategoryForm) => {
    const response = await addCategory(values);

    if (!response.ok) {
      setError(response.message);
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
              error={touched.name ? errors.name : ""}
              label="Name"
              setText={(text) => {
                setFieldValue("name", text);
              }}
              text={values.name}
            />
            <Button onClick={() => handleSubmit()}>Add</Button>
            {error ? <Text color="red">{error}</Text> : null}
          </>
        )}
      </Formik>
    </div>
  );
};
