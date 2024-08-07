"use client";

import { Formik } from "formik";
import { BuiltInProviderType } from "next-auth/providers/index";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import styles from "./page.module.css";
import Text from "@/components/Text";

export default () => {
  const [providers, setProviders] = useState<Record<
    BuiltInProviderType,
    ClientSafeProvider
  > | null>();

  const initialValues: { email: string; password: string } = {
    email: "laubana@gmail.com",
    password: "123123",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleOAuthSignIn = async (providerId: string) => {
    await signIn(providerId, { callbackUrl: "/" });
  };

  const handleCredentialsSignIn = async (values: {
    email: string;
    password: string;
  }) => {
    await signIn("credentials", {
      callbackUrl: "/",
      email: values.email,
      password: values.password,
    });
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
        <Text size={28}>Sign in</Text>
        {providers && (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCredentialsSignIn}
            >
              {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                <>
                  <input
                    type="text"
                    value={values.email}
                    onChange={(event) =>
                      setFieldValue("email", event.target.value)
                    }
                  />
                  <p>{errors.email}</p>
                  <input
                    type="text"
                    value={values.password}
                    onChange={(event) =>
                      setFieldValue("password", event.target.value)
                    }
                  />
                  <p>{errors.password}</p>
                  <button type="submit" onClick={() => handleSubmit()}>
                    Sign In with Email
                  </button>
                </>
              )}
            </Formik>
          </div>
        )}
        {providers &&
          Object.values(providers).map((provider, index) =>
            provider.type === "oauth" ? (
              <div>
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn(provider.id)}
                  key={provider.name}
                >
                  Sign In with {provider.name}
                </button>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};
