"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers/index";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import styles from "./page.module.css";
import Button from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import InputText from "@/components/InputText";
import Text from "@/components/Text";

export default () => {
  const router = useRouter();
  const [providers, setProviders] = useState<Record<
    BuiltInProviderType,
    ClientSafeProvider
  > | null>();
  const [isError, setIsError] = useState<boolean>(false);

  const initialValues: { email: string; password: string } = {
    email: "laubana@gmail.com",
    password: "123123",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
  });

  const handleOAuthSignIn = async (providerId: string) => {
    await signIn(providerId, { callbackUrl: "/" });
  };

  const handleCredentialsSignIn = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.ok) {
        router.push("/");
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);

      setIsError(true);
    }
  };

  useEffect(() => {
    const main = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    main();
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="logo"
          width={100}
          height={30}
        />
      </Link>
      <div className={styles.wrapper}>
        <Text style={{ fontSize: "28px" }}>Sign in</Text>
        {providers && (
          <div className={styles.form}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCredentialsSignIn}
            >
              {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                <>
                  <InputText
                    error={touched.email ? errors.email : ""}
                    label="Email"
                    setText={(text) => setFieldValue("email", text)}
                    text={values.email}
                  />
                  <InputPassword
                    error={touched.password ? errors.password : ""}
                    label="Password"
                    setPassword={(password) =>
                      setFieldValue("password", password)
                    }
                    password={values.password}
                  />
                  <Button onClick={() => handleSubmit()} type="submit">
                    Sign In with Email
                  </Button>
                  {isError ? <Text color="red">Sign-in failed.</Text> : null}
                </>
              )}
            </Formik>
          </div>
        )}
        <hr className={styles.divider} />
        <div className={styles.form}>
          {providers &&
            Object.values(providers).map((provider) =>
              provider.type === "oauth" ? (
                <Button
                  key={provider.id}
                  onClick={() => handleOAuthSignIn(provider.id)}
                >{`Sign In with ${provider.name}`}</Button>
              ) : null
            )}
        </div>
      </div>
      <Text color="grey" size="small">
        New to Amazon?
      </Text>
      <div className={styles["button-container"]}>
        <Link href="sign-up">
          <Button block color="white">
            Create your Amazon account
          </Button>
        </Link>
      </div>
    </div>
  );
};
