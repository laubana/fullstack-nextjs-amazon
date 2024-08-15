import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import Provider from "@/layouts/Provider";

export const metadata: Metadata = {
  title: "Amazon",
  description: "Generated by create next app",
};

export default async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          <ToastContainer
            pauseOnFocusLoss={false}
            position="top-center"
            autoClose={2000}
          />
        </Provider>
      </body>
    </html>
  );
};
