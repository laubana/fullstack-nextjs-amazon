import Header from "@/layouts/Header";
import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
