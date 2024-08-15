"use client";

import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import styles from "./CategoryForm.module.css";
import { CategoryFormProps } from "./CategoryForm.props";

import Button from "@/components/Button";
import InputText from "@/components/InputText";

import { addCategory } from "@/controllers/category";

import { CategoryFormValues } from "@/types/Category";

export default (props: CategoryFormProps) => {
  const {} = props;

  const initialValues: CategoryFormValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    const categoryFormData = new FormData();
    categoryFormData.append("name", values.name);

    const categoryResponse = await addCategory(categoryFormData);

    if (categoryResponse.ok) {
      toast.success(categoryResponse.message);
    } else {
      toast.error(categoryResponse.message);
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
          </>
        )}
      </Formik>
    </div>
  );
};
