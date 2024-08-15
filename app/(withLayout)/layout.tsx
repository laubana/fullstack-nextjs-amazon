import { ReactNode } from "react";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
