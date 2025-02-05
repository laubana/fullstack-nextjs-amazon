"use client";

import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

import styles from "./page.module.css";

import Button from "@/components/Button";
import InputPassword from "@/components/Inputs/InputPassword";
import InputText from "@/components/Inputs/InputText";
import Text from "@/components/Text";
import { signUp } from "@/controllers/auth";
import { UserFormValues } from "@/types/User";

export default () => {
  const router = useRouter();

  const initialValues: UserFormValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required."),
    name: Yup.string().required("Name is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password")], "Password and confirm password must match.")
      .min(6, "Password must be at least 6 characters."),
  });

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const signUpFormData = new FormData();
      signUpFormData.append("email", values.email);
      signUpFormData.append("name", values.name);
      signUpFormData.append("password", values.password);

      const signUpResponse = await signUp(signUpFormData);

      if (signUpResponse.ok) {
        router.push("/auth/sign-in");
      } else {
        toast.error("Failed to sign up.");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to sign up.");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="logo"
          width={100}
          height={30}
        />
      </Link>
      <div className={styles.wrapper}>
        <Text style={{ fontSize: "28px" }}>Sign Up</Text>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, values, setFieldValue, touched, errors }) => (
              <>
                <InputText
                  error={touched.email ? errors.email : ""}
                  label="Email"
                  setText={(text) => setFieldValue("email", text)}
                  text={values.email}
                />
                <InputText
                  error={touched.name ? errors.name : ""}
                  label="Name"
                  setText={(text) => setFieldValue("name", text)}
                  text={values.name}
                />
                <InputPassword
                  error={touched.password ? errors.password : ""}
                  label="Password"
                  setPassword={(password) =>
                    setFieldValue("password", password)
                  }
                  password={values.password}
                />
                <InputPassword
                  error={touched.confirmPassword ? errors.confirmPassword : ""}
                  label="Confirm Password"
                  setPassword={(password) =>
                    setFieldValue("confirmPassword", password)
                  }
                  password={values.confirmPassword}
                />
                <Button onClick={() => handleSubmit()}>Sign Up</Button>
              </>
            )}
          </Formik>
        </div>
        <Link href="sign-in">
          <Button block color="white">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};
