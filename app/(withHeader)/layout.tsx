import { ReactNode } from "react";
import Header from "@/layouts/Header";

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
